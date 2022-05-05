<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-teal-1 text-black" height-hint="98">
      <q-toolbar class="bg-grey-1 text-black">
        <q-toolbar-title>
          <router-link to="/" id="logo-url">
            <q-avatar> <img src="/img/logo.png" /> </q-avatar>
          </router-link>
          <strong>CLICKWHATS</strong>
        </q-toolbar-title>

        <div v-if="this.$store.state.app.user">
          <q-btn flat rounded color="black">
            <q-avatar size="30px">
              <img class="avatar-img" src="/img/defaultuser.png" />
            </q-avatar>
            <q-space />
            Me
            <q-menu fit anchor="bottom start" self="top start">
              <q-list dense style="min-width: 100px">
                <q-item clickable to="/widget" v-close-popup>
                  <q-item-section class="text-center" flat no-caps
                    >Widgets</q-item-section
                  >
                </q-item>
                <q-item clickable to="/configuracoes" v-close-popup>
                  <q-item-section class="text-center" flat no-caps
                    >Perfil</q-item-section
                  >
                </q-item>
                <q-separator />
                <q-item clickable @click="logout" v-close-popup>
                  <q-item-section class="text-center text-red" flat no-caps
                    >Sair
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>

        <div v-else>
          <q-tabs align="left">
            <q-btn flat rounded href="login" color="black"> Entrar </q-btn>
          </q-tabs>
        </div>

        <q-dialog
          v-model="logoutDialog"
          persistent
          transition-show="scale"
          transition-hide="scale"
        >
          <q-card class="text-gray" style="width: 300px">
            <q-card-section>
              <div class="text-h6">Aviso</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <strong> Tem certeza disso que deseja sair ? </strong>
            </q-card-section>

            <q-card-actions align="right" class="text-teal">
              <q-btn flat label="Não" style="color: gray" v-close-popup />
              <q-btn
                flat
                label="Sim"
                style="color: red"
                v-close-popup
                @click="doLogout"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <footer class="text-center">
      <q-footer class="bg-black">
        Click WhatsApp &copy; {{ new Date().getFullYear() }}
      </q-footer>
    </footer>
  </q-layout>
</template>

<script>
export default {
  props: ['logo'],
  name: 'MainLayout',
  components: {},

  data() {
    return {
      logoutDialog: false,
      canEdit: true,
      left: false,
      drawer: false,
      login: false,
      leftDrawerOpen: false
    }
  },

  methods: {
    logout() {
      let self = this
      self.logoutDialog = true
    },

    doLogout() {
      let self = this
      localStorage.removeItem('jwt')
      localStorage.removeItem('user')
      console.log(self.$store)
      setTimeout(() => {
        self.loading = false
        self.$q.notify({
          progress: true,
          message: 'Volte sempre !',
          color: 'black'
        })
        self.$router.push('/login')
      }, 500)
    }
  },

  computed: {
    state() {
      let self = this
      return self.$store.state
    },
    user() {
      let self = this
      return self.$store.state.app.user
    }
  },
  mounted() {
    let self = this
    console.log(self.$store.state.app.user)
  }
}
</script>
<style scoped>
#Footer1 {
  justify-content: flex;
  outline: auto;
  text-align: center;
  width: 100%;
  position: fixed;
  bottom: 0px;
}
</style>
