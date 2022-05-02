<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header class="bg-grey-1">
      <q-toolbar></q-toolbar>
    </q-header>
    <q-stepper class="bg-grey-1" flat v-model="step" ref="stepper" animated>
      <q-step title="" :name="1">
        <div align="center" class="col registro">
          <q-btn
            color="white"
            class="absolute-top-right"
            flat
            round
            @click="$q.dark.toggle()"
            :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
          />
 
          <q-card
            v-bind:style="
              $q.platform.is.mobile
                ? { width: '85%' }
                : { width: '35%', 'min-width': '450px' }
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
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-card>
                  <q-input
                    type="text"
                    filled
                    v-model="model.nome"
                    label="Nome"
                    lazy-rules
                  />
                </q-card>
                <q-card>
                  <q-input
                    type="password"
                    filled
                    v-model="model.senha"
                    label="senha"
                    lazy-rules
                  />
                </q-card>
                <q-card>
                  <q-input
                    type="text"
                    filled
                    v-model="model.contato"
                    label="Telefone"
                    lazy-rules
                  />
                </q-card>
                <q-card>
                  <q-input
                    type="email"
                    filled
                    v-model="model.email"
                    label="usuario@email.com"
                    lazy-rules
                  />
                </q-card>
                <q-card>
                  <q-input
                    type="text"
                    filled
                    v-model="model.cpfCnpj"
                    label="CPF / CNPJ"
                    lazy-rules
                  />
                </q-card>
                <div class="row justify-around">
                  <q-btn
                    rounded
                    size="md"
                    :loading="loading"
                    color="teal"
                    @click="doRegistro"
                    >Registrar</q-btn
                  >
                </div>
                <div class="row justify-center">
                  <q-stepper-navigation>
                    <strong> Já possui um cadastro, então faça</strong>
                    <q-btn
                      @click="
                        () => {
                          step = 2
                        }
                      "
                      dense
                      flat
                      color="teal"
                      label="Login"
                    />
                  </q-stepper-navigation>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </q-step>

      <q-step title="" :name="2">
        <div align="center" class="col Login">
          <!-- <q-btn
          color="white"
          class="absolute-top-right"
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
        /> -->
          <!-- <q-card
        class="login-form"
        v-bind:style="
          $q.platform.is.mobile
            ? { width: '85%' }
            : { width: '35%', 'min-width': '350px' }
        "
      > -->

          <q-card
            v-bind:style="
              $q.platform.is.mobile
                ? { width: '85%' }
                : { width: '35%', 'min-width': '450px' }
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
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-card>
                  <q-input
                    type="email"
                    filled
                    v-model="model.email"
                    label="usuario@email.com"
                    lazy-rules
                  />
                </q-card>
                <q-card>
                  <q-input
                    type="password"
                    filled
                    v-model="model.senha"
                    label="senha"
                    lazy-rules
                  />
                </q-card>

                <div class="row justify-around">
                  <q-stepper-navigation>
                    <q-btn
                      rounded
                      size="md"
                      :loading="loading"
                      color="teal"
                      @click="doLogin"
                      label="ENTRAR"
                    />
                  </q-stepper-navigation>
                  <q-stepper-navigation>
                    <q-btn
                      @click="
                        () => {
                          registrar = true
                          step = 1
                        }
                      "
                      rounded
                      size="md"
                      dense
                      color="teal"
                      label="REGISTRAR"
                    />
                  </q-stepper-navigation>
                </div>
                <div class="row justify-center">
                  <q-stepper-navigation>
                    <strong> Esqueceu a senha, então</strong>
                    <q-btn
                      @click="
                        () => {
                          step = 3
                        }
                      "
                      dense
                      flat
                      color="teal"
                      label="Recupere"
                    />
                  </q-stepper-navigation>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </q-step>

      <q-step title="" :name="3">
        <div align="center" class="col Login">
          <!-- <div
        id="particles-js"
        :class="$q.dark.isActive ? 'dark_gradient' : 'normal_gradient'"
      ></div>
        <q-btn
        color="white"
        class="absolute-top-right"
        flat
        round
        @click="$q.dark.toggle()"
        :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
      /> -->

          <q-card
            v-bind:style="
              $q.platform.is.mobile
                ? { width: '85%' }
                : { width: '35%', 'min-width': '450px' }
            "
          >
            <q-card-section class="items-center">
              <router-link label="CLICK WHATS" to="/" id="logo">
                <q-avatar size="25px">
                  <img src="/img/logo.png" />
                </q-avatar>
              </router-link>
              <div class="text-h6">
                <strong clickable to="/"> CLICK WHATS </strong>
              </div>
            </q-card-section>
            <q-card-section>
              <q-form class="q-gutter-md">
                <div>
                  <strong
                    >Insira o email para o envio do link de recuperação de
                    senha.</strong
                  >
                </div>
                <q-card>
                  <p />
                  <q-input
                    type="email"
                    filled
                    v-model="model.email"
                    label="usuario@email.com"
                    lazy-rules
                  />
                </q-card>
                <div class="row justify-center">
                  <q-btn
                    type="button"
                    rounded
                    label="ENVIAR"
                    :loading="loading"
                    color="teal"
                    @click="esqueciSenha"
                  />
                </div>
                <div class="row justify-center">
                  <q-stepper-navigation align="center">
                    <strong>Lenbrou a senha, então faça </strong>
                    <q-btn
                      dense
                      @click="
                        () => {
                          step = 2
                        }
                      "
                      flat
                      align="center"
                      color="teal"
                      label="LOGIN"
                    />
                  </q-stepper-navigation>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </q-step>
    </q-stepper>
  </q-layout>
</template>

<script type="text/javascript"></script>
<script>
export default {
  data() {
    return {
      forgotModel: false,
      loading: false,
      step: 2,
      model: {
        nome: '',
        senha: '',
        email: '',
        contato: '',
        cpfCnpj: ''
      }
    }
  },
  methods: {
    loginNotify() {
      let self = this

      self.$q.notify({
        message: 'Login Successful'
      })
    },

    doRegistro() {
      let self = this
      const registrar = {
        nome: self.model.nome,
        username: self.model.email,
        email: self.model.email,
        password: self.model.senha,
        contato: self.model.contato,
        cpfCnpj: self.model.cpfCnpj
      }
      self.loading = true
      self.$api.post('auth/local/register', registrar).then((data) => {
        const login = {
          identifier: self.model.email,
          password: self.model.senha
        }
        self.loading = true

        self.$api
          .post('auth/local', login)
          .then((resp) => {
            self.$store.commit('app/setUser', resp.data.user)
            localStorage.setItem('jwt', resp.data.jwt)
            localStorage.setItem('user', JSON.stringify(resp.data.user))

            self.$api.defaults.headers.common.Authorization = `Bearer ${resp.data.jwt}`
            console.log(localStorage)
            if (resp.data.jwt) {
              self.$api.defaults.headers.common[
                'Authorization'
              ] = `Bearer ${resp.data.jwt.replace(/['"]+/g, '')}`
            }
            setTimeout(() => {
              self.loading = false
              self.$q.notify({
                progress: true,
                message: 'SEJA BEM VINDO!',
                color: 'black'
              })
              self.$router.push('/widget')
            }, 1000)
          })

          .catch((err) => {
            setTimeout(() => {
              self.loading = false
              self.$q.notify({
                progress: true,
                message: 'USUÁRIO OU SENHA INVÁLIDOS...',
                color: 'red'
              })
            }, 2000)
          })
      })
    },

    doLogin() {
      let self = this
      const login = {
        identifier: self.model.email,
        password: self.model.senha
      }
      self.loading = true

      self.$api
        .post('auth/local', login)
        .then((resp) => {
          self.$store.commit('app/setUser', resp.data.user)
          localStorage.setItem('jwt', resp.data.jwt)
          localStorage.setItem('user', JSON.stringify(resp.data.user))

          self.$api.defaults.headers.common.Authorization = `Bearer ${resp.data.jwt}`
          console.log(localStorage)
          if (resp.data.jwt) {
            self.$api.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${resp.data.jwt.replace(/['"]+/g, '')}`
          }
          setTimeout(() => {
            self.loading = false
            self.$q.notify({
              progress: true,
              message: 'SEJA BEM VINDO!',
              color: 'black'
            })
            self.$router.push('/widget')
          }, 1000)
        })

        .catch((err) => {
          setTimeout(() => {
            self.loading = false
            self.$q.notify({
              progress: true,
              message: 'USUÁRIO OU SENHA INVÁLIDOS...',
              color: 'red'
            })
          }, 2000)
        })
    },

    esqueciSenha() {
      let self = this
      self.$api
        .post('auth/forgot-password', {
          email: self.email
        })
        .then(() => {
          console.log(self.email)
        })
    }
  },
  mounted() {}
}
</script>

<style>
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
.normal_gradient {
  background: linear-gradient(145deg, rgb(74, 94, 137) 40%, #b61924 99%);
}
.dark_gradient {
  background: linear-gradient(145deg, rgb(11, 26, 61) 30%, #4c1014 99%);
}
.login-form {
  position: absolute;
}
</style>
