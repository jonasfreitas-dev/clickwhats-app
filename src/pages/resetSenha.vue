<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <div class="row items-center">
      <div align="center" class="col absolute-center">
        <q-card
          v-bind:style="
            $q.platform.is.mobile
              ? { width: '85%' }
              : { width: '45%', 'min-width': '450px' }
          "
        >
          <q-card-section class="items-center">
            <router-link label="CLICK WHATS" to="/" id="logo">
              <q-avatar size="25px">
                <img src="/img/logo.png" />
              </q-avatar>
            </router-link>
            <div class="text-h6">
              <strong> CLICK WHATS </strong>
            </div>
          </q-card-section>
          <p />
          <p><strong> Informe a nova senha.</strong></p>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-card>
                <q-input
                  type="password"
                  filled
                  v-model="model.senha"
                  label="*Nova senha"
                  lazy-rules
                />
              </q-card>
              <q-card>
                <q-input
                  type="password"
                  filled
                  v-model="model.confirmacaoSenha"
                  label="* Confirme a senha"
                  lazy-rules
                />
              </q-card>
              <div class="row justify-around">
                <q-btn
                  rounded
                  @click="resetSenha"
                  dense
                  color="teal"
                  label="Enviar"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-layout>
</template>

<script type="text/javascript"></script>
<script>
export default {
  data() {
    return {
      loading: false,
      model: {
        code: '',
        senha: '',
        confirmacaoSenha: ''
      }
    }
  },
  methods: {
    resetSenha() {
      let self = this
      self.loading = true

      self.$api
        .post('/auth/reset-password', {
          code: self.model.code,
          password: self.model.senha,
          passwordConfirmation: self.model.confirmacaoSenha
        })
        .then((response) => {
          setTimeout(() => {
            self.loading = false
            self.$q.notify({
              progress: true,
              message:
                'Sua senha foi resetada com sucesso, faça login com a nova senha!',
              color: 'black'
            })
            self.$router.push('/login')
          }, 1000)
        })
        .catch((error) => {
          setTimeout(() => {
            self.loading = false
            self.$q.notify({
              progress: true,
              message: console.log('An error occurred:', error.response),
              color: 'red'
            })
          }, 2000)
        })
    }
  },
  mounted() {
    let self = this
    self.model.code = self.$route.query.code
  }
}
</script>

<style>
</style>
