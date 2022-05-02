<template>
  <section>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <div class="row q-pa-md">
          <div class="col">
            <q-btn
              size="md"
              icon="cloud_upload"
              class="full-width"
              color="deep-purple-8"
              label="Publicar Widget"
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
      <div class="col-sm-0 col-md-6">
        <div class="row">
          <label style="font-weight: 500; font-size: 1.8rem"
            >Configuracão do Widget</label
          >
        </div>
        <div class="row">
          <div class="col-12 q-mt-lg">
            <q-input
              filled
              v-model="name"
              label="Nome"
              hint="Loja1, Loja2, Vendas, Suporte"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Digite um nome para seu Widget'
              ]"
            />
          </div>
          <div class="col-12 q-mt-lg">
            <q-input
              filled
              v-model="buttonMessage"
              label="Mensagem do botão"
              hint="Chamada para ação"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Escreva alguma mensagem para a ação'
              ]"
            />
          </div>
          <div class="col-12 q-mt-lg">
            <q-input
              filled
              v-model="widgetMessage"
              label="Mensagem do widget"
              hint="Informação sobre sua empresa"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Escreva alguma mensagem para a ação'
              ]"
            />
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-12">
        <div
          class="q-ma-md full-height row wrap justify-center items-stretch content-start"
        >
          <q-card class="fit preview">
            <Widget :name="name" :widgetMessage="widgetMessage" />
          </q-card>
        </div>
      </div>
    </div>
    <div class="row q-mt-lg q-ml-md">
      <div class="col-12">
        <label style="font-weight: 500; font-size: 1.8rem"
          >Logo do seu Negócio</label
        >
      </div>
      <div class="col-sm-12 col-md-6 q-pa-md">
        <div class="row">
          <div class="col">
            <img
              :style="{ width: '64px' }"
              src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg"
            />
          </div>
          <div class="col q-pa-sm">
            <q-btn color="deep-purple-8" label="Alterar Logo" />
          </div>
        </div>
      </div>
      <div class="col-6 q-pa-md"></div>
      <div class="col-12">
        <q-toggle
          v-model="hideLogo"
          color="deep-purple-8"
          label="Esconder logo no Widget"
        />
      </div>
      <div class="col-12">
        <q-toggle
          v-model="roundLogo"
          color="deep-purple-8"
          label="Arredondar a logo"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {
    Widget: () => import('./Widget')
  },
  data() {
    return {
      name: '',
      buttonMessage: '',
      widgetMessage: '',
      hideLogo: false,
      roundLogo: false
    }
  }
}
</script>

<style>
.preview {
  border: 2px dashed rgb(69, 161, 223);
  border-radius: 10px;
}
</style>