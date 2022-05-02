<template>
  <div class="q-pa-md column items-center">
    <q-parallax :height="300" :speed="0.5">
      <template v-slot:media>
        <img src="darkbg.jpg" />
      </template>

      <template v-slot:content="scope">
        <div
          class="absolute column items-center"
          :style="{
            opacity: 0.8 + (1 - scope.percentScrolled) * 0.55,
            top: scope.percentScrolled * 10 + '%',
            left: 0,
            right: 0
          }"
        >
          <img src="logo.png" />
          <div class="text-h4 text-white text-center">
            {{ lead.respondido ? 'LEAD RESPONDIDO EM' : 'NOVO LEAD' }}
          </div>
          <div v-if="lead.respondido" class="text-h6 text-white text-center">
            {{ timeToL(lead.updated_at) }}
          </div>
        </div>
      </template>
    </q-parallax>
    <div class="text-h3 text-black text-center" style="margin-top: 18px">
      {{ lead.nome }}
    </div>
    <div class="text-h6 text-grey text-center" style="margin-top: 18px">
      {{ lead.motivo }}
    </div>
    <q-btn
      style="margin-top: 36px"
      align="around"
      class="btn-fixed-width"
      color="green-5"
      label="responder"
      icon="fab fa-whatsapp"
      @click="redirect"
    />
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      lead: {}
    }
  },
  methods: {
    redirect() {
      let self = this
      self.lead.respondido = true

      self.$store
        .dispatch('app/updateEntry', {
          context: 'leads',
          id: self.lead.id,
          data: self.lead
        })
        .then(function (res) {
          self.lead = res
          window.open(`https://wa.me/${self.lead.telefone}`, '_self')
        })
    },
    timeToL(t) {
      return moment(t).locale('pt-br').format('D  MMM - LT')
    }
  },
  mounted() {
    let self = this
    let id = this.$route.params.id

    self.$store
      .dispatch('app/getEntry', { context: 'leads', param: id })
      .then(function (res) {
        self.lead = res
      })
  }
}
</script>

<style>
</style>