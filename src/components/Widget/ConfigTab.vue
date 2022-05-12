<template>
  <section>
    <div class="row">
      <div class="col">
        <div class="row q-pa-md">
          <div class="col">
            <q-btn
              size="md"
              icon="cloud_upload"
              class="full-width"
              color="deep-purple-8"
              label="Publicar Widget"
              @click="pubWidget"
            />
          </div>
          <div class="col">
            <q-btn
              size="md"
              icon="delete"
              class="full-width"
              flat
              color="red-5"
              label="Deletar Widget"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row q-pa-md">
      <div class="col-4">
        <div class="row q-pa-md">
          <label style="font-weight: 500; font-size: 1.8rem"
            >Configuracão do Widget</label
          >
        </div>
        <q-card>
          <q-input filled v-model="model.nome" label="Nome" lazy-rules />
        </q-card>
        <div style="font-size: 0.8em" class="text-grey">
          <strong> Loja1, Loja2, Vendas, Suporte</strong>
        </div>
        <p />
        <q-card>
          <q-input
            filled
            v-model="model.msgBtn"
            label="Mensagem do botão"
            lazy-rules
          />
        </q-card>
        <div style="font-size: 0.8em" class="text-grey">
          <strong>Chamada para ação</strong>
        </div>
        <p />
        <q-card>
          <q-input
            filled
            v-model="model.widgetMsg"
            label="Menssagen do Widget"
            lazy-rules
          />
        </q-card>
        <div style="font-size: 0.8em" class="text-grey">
          <strong>Informação sobre sua empresa</strong>
        </div>
      </div>
      <p />
      <q-space />
      <div class="col-md-6 col-sm-12">
        <div
          class="q-ma-md full-height row wrap justify-center items-stretch content-start"
        >
          <q-card class="fit preview">
            <Widget
              :name="model.nome"
              :widgetMsg="model.widgetMsg"
              :msgBtn="model.msgBtn"
              :enpresaLlogo="model.enpresaLlogo"
              :whatsAppIcon="model.whatsAppIcon"
              :agents="model.agents"
            />
          </q-card>
        </div>
      </div>
    </div>

    <div class="row q-mt-lg q-ml-md">
      <div class="col-5">
        <label style="font-weight: 500; font-size: 1.8rem"
          >Logo do seu Negócio</label
        >
        <div class="col-12">
          <q-avatar square v-if="model.roundedLogo === false">
            <img
              :src="
                model.enpresaLlogo
                  ? `https://wild-donkeys-pick-138-117-223-71.loca.lt${model.enpresaLlogo[0].url}`
                  : '/img/defaultuser.png'
              "
            />
          </q-avatar>
          <q-avatar v-else>
            <img
              :src="
                model.enpresaLlogo
                  ? `https://wild-donkeys-pick-138-117-223-71.loca.lt${model.enpresaLlogo[0].url}`
                  : '/img/defaultuser.png'
              "
            />
          </q-avatar>
          <div class="col q-pa-sm">
            <q-btn color="deep-purple-8" label="Alterar Logo" />
          </div>
          <p />
          <div class="col">
            <q-toggle
              v-model="model.hideLogo"
              color="deep-purple-8"
              label="Esconder logo no Widget"
            />
            <p />
            <q-toggle
              v-model="model.roundedLogo"
              color="deep-purple-8"
              label="Arredondar a logo"
            />
            <p />
          </div>
          <div class="row">
            <p />
            <div class="col-md-3">
              Altura da logo
              <q-card>
                <q-input filled v-model="model.heightLogo" />
              </q-card>
            </div>

            <div class="col-md-3 offset-md-3">
              Largura da logo
              <q-card>
                <q-input filled v-model="model.widthLogo" />
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row q-mt-lg q-ml-md">
      <div class="col-5">
        <label style="font-weight: 500; font-size: 1.8rem"
          >Icone do Whatsapp</label
        >
        <div class="col-md-3">
          <div class="col-6">
            <q-avatar>
              <img
                :src="
                  model.whatsAppIcon
                    ? `https://wild-donkeys-pick-138-117-223-71.loca.lt${model.whatsAppIcon[0].url}`
                    : '/img/defaultuser.png'
                "
              />
            </q-avatar>
          </div>
          <div class="col-6">
            <q-btn color="deep-purple-8" label="Alterar Logo" />
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-center">
      <q-btn @click="pubWidget" color="teal"> Publicar Widget </q-btn>
    </div>
    <h1></h1>
  </section>
</template>

<script>
// import { exportFile } from 'quasar'
// import { v4 as uuidv4 } from 'uuid'

export default {
  components: {
    Widget: () => import('./Widget')
  },
  data() {
    return {
      model: {
        nome: '',
        msgBtn: '',
        widgetMsg: '',
        hideLogo: false,
        roundedLogo: false,
        heightLogo: '',
        widthLogo: '',
        whatsAppIcon: null,
        enpresaLlogo: null
      }
    }
  },

  methods: {
    getWidgets() {
      let self = this
      const { uuid } = self.$route.params
      self.$api
        .get('widgets/' + uuid)
        .then(({ data }) => {
          self.model = data
          console.log(self.model)
        })
        .catch((erro) => {
          console.log(erro)
        })
    },
    pubWidget() {
      let self = this
      const { id } = self.$route.params
      if (id === 'new') {
        self.$api
          .post('widgets/pubWidget', {
            data: {
              nome: self.model.nome,
              msgBtn: self.model.msgBtn,
              widgetMsg: self.model.widgetMsg,
              hideLogo: self.model.hideLogo,
              roundedLogo: self.model.roundedLogo,
              heightLogo: self.model.heightLogo,
              widthLogo: self.model.widthLogo,
              // whatsAppIcon: self.model.whatsAppIcon,
              // enpresaLlogo: self.model.enpresaLlogo,
              // perguntas: null,
              child_of: self.$store.state.app.user

              //
            }
          })
          .then((data) => {
            // self.handleFileUpload()
            // self.$router.push('/widget')
            // console.log(data)
            // console.log(chId)
          })
      } else {
        self.$api
          .put('widgets/' + id, {
            data: {
              nome: self.model.nome,
              msgBtn: self.model.msgBtn,
              widgetMsg: self.model.widgetMsg,
              hideLogo: self.model.hideLogo,
              roundedLogo: self.model.roundedLogo,
              heightLogo: self.model.heightLogo,
              widthLogo: self.model.widthLogo
              // whatsAppIcon: self.model.whatsAppIcon,
              // enpresaLlogo: self.model.enpresaLlogo,
              // perguntas: null,
              // child_of: child_ofId
            }
          })
          .then((data) => {
            // self.handleFileUpload()
            // self.getWidgets()
            // console.log(data)
          })
      }
    },

    chooseFiles: function () {
      document.getElementById('file').click()
    },

    handleFileUpload() {
      let self = this
      // self.file = self.$refs.file.files[0];
      let form = self.$refs.form
      self.$api.post('upload', new FormData(form)).then((res) => {
        self.foto = res.data
        console.log(self.foto)
        self.setFoto()
        self.get()
      })
    },
    setFoto() {
      let self = this
      const foto = self.foto
      const { id } = self.$route.params
      self.$api.put('users/' + id, { foto: foto[0].id }).then((res) => {
        // console.log(res)
        self.get()
      })
    }
  },

  mounted() {
    let self = this
    self.getWidgets()
    // self.$store.state.app.use
    // console.log($store.state.app.user)
  }
}
</script>

<style>
.preview {
  border: 2px dashed rgb(69, 161, 223);
  border-radius: 10px;
}
</style>