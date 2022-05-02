<template>
  <div>
    <div
      class="open-chat"
      :class="isOpen ? 'hide' : 'show'"
      @click="toggleChatOpen"
    >
      <q-chat-message
        :avatar="avatarUrl"
        :name="botName"
        :sent="true"
        :text="startMsgs"
      >
        <q-spinner-dots v-if="digitando" size="2rem" />
      </q-chat-message>

      <q-badge
        style="
          position: absolute;
          right: 0;
          margin-top: -20px;
          margin-right: 0px;
        "
        color="green"
      ></q-badge>
    </div>

    <div
      class="chat-container z-top bg-grey-1"
      :class="isOpen ? 'show' : 'hide'"
      :style="{
        bottom: $q.platform.is.mobile ? '0px' : '30px',
        right: $q.platform.is.mobile ? '0' : '30px',
        left: $q.platform.is.mobile ? '0px' : 'auto',
        top: $q.platform.is.mobile ? '5px' : 'auto',
      }"
    >
      <div>
        <q-toolbar class="text-black q-pt-md q-pb-md">
          <q-avatar size="60px">
            <img :src="avatarUrl" />
          </q-avatar>
          <q-toolbar-title>
            {{ botName }}
            <q-item-label caption
              >Assistente Virtual</q-item-label
            ></q-toolbar-title
          >

          <q-btn
            @click="closeChat()"
            round
            dense
            flat
            color="black"
            icon="close"
          />
        </q-toolbar>
        <div
          ref="chatArea"
          class="chat-area q-pa-md"
          :style="{
            height: $q.platform.is.mobile ? 'calc(100vh - 190px)' : '450px',
          }"
        >
          <div v-for="(message, msgIndex) in messageListProp" :key="msgIndex">
            <q-chat-message
              :text-color="msgOutTxtColor"
              :bg-color="msgOutBgColor"
              v-if="message.type === 'text' && message.author === 'you'"
              sent
            >
              <q-markdown :src="urlify(message.body)" />
            </q-chat-message>
            <q-chat-message
              :text-color="msgInTxtColor"
              :bg-color="msgInBgColor"
              v-if="message.type === 'text' && message.author !== 'you'"
            >
              <q-markdown :src="urlify(message.body)" />
            </q-chat-message>
            <div class="q-ma-md" v-if="message.type === 'quick'">
              <q-btn
                no-caps
                dense
                push
                color="white"
                class="full-width text-black q-ma-xs"
                v-for="(quick, quickIndex) in message.body"
                :key="quickIndex"
                :label="quick.title"
                @click="sendQuickValue(quick.payload)"
              >
              </q-btn>
            </div>
          </div>
        </div>
        <div class="chat-input">
          <form
            @submit.prevent="handleOutboundMessage()"
            class="chat-form q-ml-sm q-mr-sm"
          >
            <q-input
              v-model="youMessage"
              type="text"
              borderless
              label="Escreva sua mensagem aqui..."
              autofocus
              class="full-width"
            >
              <template v-slot:after>
                <q-btn
                  round
                  dense
                  flat
                  icon="send"
                  class="submit"
                  type="submit"
                  @click="handleOutboundMessage()"
                />
              </template>
            </q-input>
            <q-btn
              style="display: none"
              class="submit"
              type="submit"
              color="grey"
              round
              flat
              icon="send"
            >
            </q-btn>
          </form>
        </div>
      </div>
      <div class="text-center">
        <label style="color: gray; font-size: 10pt"
          >powered by <a href="https://callwhats.net">callwhats.net</a></label
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const converse = axios.create({
  baseURL: "https://bot.callwhats.net/api/v1/bots",
});
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default {
  name: "Chat",
  props: {
    botId: {
      type: String,
      default: "callwhatsnet",
    },
    botName: {
      type: String,
      default: "",
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    msgOutBgColor: {
      type: String,
      default: "light-green-2",
    },
    msgOutTxtColor: {
      type: String,
      default: "black",
    },
    msgInBgColor: {
      type: String,
      default: "light-green-2",
    },
    msgInTxtColor: {
      type: String,
      default: "black",
    },
    messageListProp: Array,
    initOpenProp: Boolean,
  },
  data: () => {
    return {
      userId: null,
      youMessage: "",
      isOpen: false,
      digitando: true,
      startMsgs: [],
    };
  },
  methods: {
    urlify(text) {
      var urlRegex = /(https?:\/\/[^\s]+)/g;
      return text
        .replace(urlRegex, function (url) {
          return `<a href='${url}' target='_blank'> ${url}</a> `;
        })
        .replace(/\*{1,2}(.*?)\*{1,2}/g, "<strong>$1</strong>")
        .replace(/(?:\r\n|\r|\n)/g, "<br>");
    },
    //
    sendQuickValue(payload, addToChat = true) {
      this.youMessage = payload;
      this.handleOutboundMessage(addToChat);
    },
    //
    handleOutboundMessage(addToChat = true) {
      if (!this.youMessage) {
        return;
      }
      if (addToChat)
        this.$emit("onMessageWasSent", {
          body: this.youMessage,
          author: "you",
          type: "text",
        });
      converse
        .post(`/${this.botId}/converse/${this.userId}`, {
          type: "text",
          text: this.youMessage,
        })
        .then((res) => {
          console.log(res.data.responses);
          res.data.responses.forEach((msg) => {
            if (msg.type === "text") {
              this.$emit("onMessageWasSent", {
                body: msg.text,
                author: "Callwhats",
                type: "text",
              });
            }
            if (msg.type === "custom" && msg.component === "QuickReplies") {
              if (
                msg.wrapped &&
                msg.wrapped.text &&
                msg.wrapped.type === "text"
              ) {
                this.$emit("onMessageWasSent", {
                  body: msg.wrapped.text,
                  author: "Callwhats",
                  type: "text",
                });
              }
              this.$emit("onMessageWasSent", {
                body: msg.quick_replies,
                author: "Callwhats",
                type: "quick",
              });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
      this.youMessage = "";
      this.$nextTick(() => {
        setTimeout(() => {
          this.messageScroll();
        }, 2000);
      });
    },
    //
    toggleChatOpen() {
      if (this.messageListProp.length === 0) this.sendQuickValue("oi", false);
      this.isOpen = !this.isOpen;
      this.$emit("onToggleOpen", this.isOpen);
      window.parent.postMessage({ chatOpen: this.isOpen }, "*");
    },
    closeChat() {
      this.isOpen = false;
      window.parent.postMessage({ chatOpen: this.isOpen }, "*");
    },
    messageScroll() {
      let messageDisplay = this.$refs.chatArea;
      messageDisplay.scrollTop = messageDisplay.scrollHeight;
    },
  },
  async mounted() {
    this.isOpen = this.initOpenProp || false;
    if (this.messageListProp) {
      this.messageScroll();
    }
    let msgs = [
      "Olá visitante, seja bem vindo!",
      "Se precisar de ajuda, fala comigo.",
    ];
    for (const key in msgs) {
      const element = msgs[key];
      this.digitando = true;
      await sleep(2000);
      this.startMsgs.push(element);
      this.digitando = false;
    }
    this.userId = uuidv4();
  },
};
</script>

<style scoped lang="css">
* {
  box-sizing: border-box;
}
.headline {
  text-align: center;
  font-weight: 100;
  color: white;
}
.chat-container {
  position: fixed;
  max-width: 390px;
  width: 100%;
  /* z-index: 10000; */
  transform: scale(0);
  transform-origin: right bottom;
  background-color: white;
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 0;
}
.chat-container.show {
  animation: scaleIn 0.45s ease-in-out 0s 1 normal forwards;
}
.chat-container.hide {
  display: none;
}
.chat-window {
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.1);
  width: 100%;
}
.chat-area {
  border-radius: 3px;
  background-image: url("https://app.callwhats.net/wabg.png");
  background-size: 450px;
  background-repeat: repeat;
  padding: 1em;
  position: relative;
  overflow: auto;
  width: 100%;
  /* z-index: 10001; */
}
.message {
  width: 45%;
  border-radius: 10px;
  padding: 0.5em;
  font-size: 0.8em;
}
.message-greeting {
  width: 100%;
  margin-left: 0;
  border-radius: 10px;
  padding: 0.5em;
  font-size: 1em;
  color: #ffffff;
  background-color: #3c4954;
}
.message-out {
  color: #ffffff;
  margin-left: 50%;
}
.message-in {
  background: #f1f0f0;
  color: black;
}
.chat-inputs {
  display: flex;
  justify-content: space-between;
}
.chat-input input {
  border: none;
  font-size: 0.8em;
  outline: none;
  padding: 1.5em;
  width: 100%;
}
.chat-form {
  background: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  width: 98%;
}
.submit {
  -webkit-appearance: none;
  background: transparent;
  border: 0;
  cursor: pointer;
}
.submit:focus {
  outline: none;
}
.submit-icon {
  width: 20px;
}
.close-chat {
  position: absolute;
  right: -8px;
  top: -15px;
  width: 35px;
  border-radius: 50%;
  height: 35px;
  background: #f7f7f7;
  cursor: pointer;
  transform: scale(0);
}
.chat-container.show .close-chat {
  animation: scaleIn 0.45s ease-in-out 0.3s 1 normal forwards;
}
.close-chat svg {
  position: relative;
  left: 6px;
  top: 6px;
  width: 20px;
}
.open-chat-message {
  position: fixed;
  padding: 10px;
  right: 75px;
  bottom: 40px;
  cursor: pointer;
  z-index: 99999;
}
.speech-bubble {
  position: absolute;
  padding: 5px;
  border-radius: 0.9em;
  bottom: 25px;
  right: 70px;
  min-width: 280px;
  max-width: 280px;
  min-height: 42px;
  max-height: 58px;
}
.open-chat {
  position: fixed;
  right: 10px;
  bottom: 25px;
  cursor: pointer;
  z-index: 9001;
}
.open-chat.hide {
  display: none;
}
.open-chat.show {
  animation: scaleIn 0.45s ease-in-out 0.15s 1 normal forwards;
}
@keyframes scaleIn {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>