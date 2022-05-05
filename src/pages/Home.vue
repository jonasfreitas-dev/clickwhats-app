<template>
  <q-layout view="hHh lpR fFf">
    <Chat
      :botId="botId"
      :botName="botName"
      :avatarUrl="avatarUrl"
      :msgOutBgColor="msgOutBgColor"
      :msgOutTxtColor="msgOutTxtColor"
      :msgInBgColor="msgInBgColor"
      :msgInTxtColor="msgInTxtColor"
      :messageListProp="messageList"
      :initOpenProp="initOpen"
      @onToggleOpen="handleToggleOpen"
      @onMessageWasSent="handleMessageReceived"
    />

    <!-- <q-card
      class="q-pa-sm"
      style="
        border-radius: 8px;
        z-index: 100;
        width: 50%;
        position: fixed;
        bottom: 0;
      "
    >
      <q-toolbar>
        <q-toolbar-title>Propriedades</q-toolbar-title>
        <q-btn flat round icon="remove" />
      </q-toolbar>
      <q-card-section>
        <div class="q-gutter-sm">
          <q-input v-model="siteUrl" label="Site Exemplo" />
        </div>
        <div class="q-gutter-sm">
          <q-input v-model="botId" label="Identificador do ChatBot" />
        </div>
        <div class="q-gutter-sm">
          <q-input v-model="botName" label="Nome do Assistente Virtual" />
        </div>
        <div class="q-gutter-sm">
          <q-input
            v-model="avatarUrl"
            label="Endereço (Url) da Imagem para o assistente"
          />
        </div> -->
    <!-- <div class="q-gutter-sm">
          <q-checkbox v-model="initOpen" label="Encurtar Link" />
        </div> -->
    <!-- <prism-editor
          class="my-editor"
          v-model="code"
          :highlight="highlighter"
          line-numbers
          readonly
        ></prism-editor> -->
    <!-- <div class="q-gutter-sm">
          <q-input
            filled
            label="COR DO TEXTO DA MENSAGEM ENVIADA"
            v-model="msgOutTxtColor"
            class="my-input"
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color format-model="hex" v-model="msgOutTxtColor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            filled
            label="COR DE FUNDO DA MENSAGEM ENVIADA"
            v-model="msgOutBgColor"
            class="my-input"
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color format-model="hex" v-model="msgOutBgColor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            filled
            label="COR DO TEXTO DA MENSAGEM RECEBIDA"
            v-model="msgInTxtColor"
            class="my-input"
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color format-model="hex" v-model="msgInTxtColor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            filled
            label="COR DE FUNDO DA MENSAGEM RECEBIDA"
            v-model="msgInBgColor"
            class="my-input"
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color format-model="hex" v-model="msgInBgColor" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div> -->
    <!-- <div class="q-gutter-sm q-ma-sm">
          <q-btn
            label="Copiar Script"
            color="green"
            class="full-width"
            no-caps
          />
        </div>
      </q-card-section>
    </q-card> -->
  </q-layout>
</template>

<script>
//import incomingMessageSound from "../assets/notification.mp3"; // pick an audio file for chat response
// import Prism Editor
// import { PrismEditor } from "vue-prism-editor";
// import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// // import highlighting library (you can use any library you want just return html string)
// import { highlight, languages } from "prismjs/components/prism-core";
// import "prismjs/components/prism-clike";
// import "prismjs/components/prism-javascript";
// import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

export default {
  name: 'livechat',

  components: {
    Chat: () => import('components/Chat')
    // PrismEditor,
  },

  data: () => {
    return {
      messageList: [],
      messageListWel: [],
      initOpen: false,
      toggledOpen: false,
      iconColorProp: '#3489eb',
      msgOutBgColor: 'light-green-2',
      msgOutTxtColor: 'black',
      msgInBgColor: 'white',
      msgInTxtColor: 'black',
      showStartMsg: true,
      siteUrl: 'https://callwhats.net',
      botId: 'callwhatsnet',
      botName: 'Carla',
      avatarUrl:
        'https://image.freepik.com/free-photo/young-beautiful-woman-looking-camera-trendy-girl-casual-summer-white-t-shirt-jeans-shorts-positive-female-shows-facial-emotions-funny-model-isolated-yellow_158538-15796.jpg'
    }
  },
  computed: {
    code() {
      let scr = `<_s id="callwhats"
      data-botid="${this.botId}"
      data-botname="${this.botName}"
      data-avatar="${this.avatarUrl}"
      src="https://live.callwhats.net/inject.js"></_s>`
      return scr.replace(/(?:_s)/g, 'script')
    }
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js) // languages.<insert language> to return html with markup
    },
    // Send message from you
    handleMessageReceived(message) {
      this.messageList.push(message)
    },
    // Receive message from them (handled by you with your backend)
    handleMessageResponse(message) {
      if (message.length > 0) {
        this.messageList.push({ body: message, author: 'them' })
      }
    },
    // Chat toggled open event emitted
    handleToggleOpen(open) {
      this.toggledOpen = open
      // connect/disconnect websocket or something
    },
    // Audible chat response noise, use whatever noise you want
    handleMessageResponseSound() {
      const audio = new Audio('https://api.callwhats.net/whatsapp_incoming.mp3')
      audio.addEventListener('loadeddata', () => {
        audio.play()
      })
    }
  },
  // init chat with a message
  mounted() {
    let self = this
    if (self.showStartMsg)
      self.messageListWel.push({
        body: self.startMsg,
        author: 'callwhats'
      })
  },
  watch: {
    messageList: function (newList) {
      const nextMessage = newList[newList.length - 1]
      const isIncoming = (nextMessage || {}).author !== 'you'
      if (isIncoming && this.toggledOpen) {
        this.handleMessageResponseSound()
      }
    }
  }
}
</script>
<style>
/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
