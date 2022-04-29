<template>
  <section>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <div class="row">
          <div class="col">
            <q-btn class="full-width" color="primary" label="Publicar Widget" />
          </div>
          <div class="col">
            <q-btn
              class="full-width"
              flat
              color="grey"
              label="Deletar Widget"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row q-pa-md">
      <div class="col text-center q-pa-md">
        <label style="font-weight: 500; font-size: 1.8rem"
          >Configuracão do Widget</label
        >
      </div>
      <div class="col"></div>
    </div>
    <div class="row q-pa-md">
      <div class="col">
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
      <div class="col"></div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      buttonMessage: '',
      widgetMessage: ''
    }
  }
}
</script>

<style>
</style>