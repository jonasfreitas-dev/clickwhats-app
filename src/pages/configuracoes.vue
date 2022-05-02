<template>
  <div id="user-table">
    <q-card>
      <q-card-section>
        <div class="q-pa-md">
          <div class="row">
            <div class="text-h6">
              <strong> {{ conta.nome }} </strong>
            </div>
            <q-space />

            <q-btn
              color="white"
              flat
              to="/Widget"
              text-color="grey"
              label="Voltar"
              icon="logout"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section dense>
        <div class="row justify-evenly">
          <div class="col-3">
            <div class="row">
              <div
                @click="chooseFiles"
                class="col-12 py-4 text-center cursor-hand"
              >
                <q-avatar size="250px">
                  <img
                    class="avatar-img"
                    :src="
                      conta.foto
                        ? `http://localhost:1337${conta.foto.url}`
                        : 'defaultuser.png'
                    "
                    alt="Homepage picture"
                  />
                  <form ref="form">
                    <input
                      :disable="canEdit"
                      id="file"
                      name="files"
                      ref="file"
                      type="file"
                      @change="handleFileUpload"
                      hidden
                    />
                  </form>
                </q-avatar>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div v-if="canEdit === true">
              <q-btn
                icon="edit"
                flat
                color="white"
                text-color="black"
                @click="canEdit = !canEdit"
                label="Editar perfil"
              />
            </div>
            <div v-else>
              <q-btn
                icon="save_alt"
                flat
                color="white"
                text-color="blue"
                @click="editSave"
                label="Salvar"
              />
            </div>
            <q-btn
              flat
              :icon="conta.blocked ? 'lock_open' : 'lock'"
              color="white"
              :text-color="conta.blocked ? 'blue' : 'red'"
              :label="conta.blocked ? 'Desbloquear conta' : 'Bloquear conta'"
              @click="blocked"
            />
            <p />
            <strong> Define se a conta permanece ativo para utilização </strong>
            <p />
            <q-toggle :disable="canEdit" dense v-model="conta.confirmed" />
            <strong>ON / OFF</strong>
            <p />
            <q-separator />
            <p />
            <strong> Define como uma conta Master</strong>
            <p></p>
            <q-toggle :disable="canEdit" dense v-model="conta.master" />
            <strong>ON / OFF</strong>
            <p />
          </div>
        </div>
      </q-card-section>
      <div class="q-pa-md">
        <div class="row justify-evenly">
          <div class="col-3">
            <div class="q-gutter-y-md column" style="max-width: 300px">
              <strong>Nome de usuario:</strong>
              <q-input
                outlined
                :disable="canEdit"
                dense
                v-model="conta.username"
              />
              <strong>Senha:</strong>
              <q-input
                outlined
                :disable="canEdit"
                dense
                :type="isPwd ? 'password' : 'text'"
                v-model="conta.senha"
              />
              <strong>Email:</strong>
              <q-input
                outlined
                :disable="canEdit"
                dense
                v-model="conta.email"
              />
            </div>
          </div>
          <div class="col-3">
            <div class="q-gutter-y-md column" style="max-width: 300px">
              <strong> Nome completo:</strong>
              <q-input outlined :disable="canEdit" dense v-model="conta.nome" />
              <strong>Telefone:</strong>
              <q-input
                outlined
                :disable="canEdit"
                dense
                v-model="conta.numero"
              />
              <strong>CPF/CNPJ:</strong>
              <q-input outlined :disable="canEdit" dense v-model="conta.cpf" />
            </div>
          </div>
        </div>
      </div>
      <q-separator />
      <q-separator />
      <!-- <q-table
        title="Operadores"
        flat
        dense
        bordered
        :data="operadores"
        :columns="tabAssinatura"
        :hide-header="mode === 'grid'"
        :grid="mode == 'grid'"
        :selected.sync="selected"
        row-key="id"
      >
      </q-table> -->
    </q-card>
    <div class="q-pa-md"></div>
    <router-view />
  </div>
</template>

<script>
import { exportFile } from 'quasar'

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val
  formatted =
    formatted === void 0 || formatted === null ? '' : String(formatted)
  formatted = formatted.split('"').join('""')
  return `"${formatted}"`
}

export default {
  components: {},
  data() {
    return {
      file: null,
      foto: null,
      canEdit: true,
      file: null,
      isPwd: true,
      sessao: [],
      assinatura: [],
      data: [],
      sessoes: [],
      selected: [],
      infoSessoes: ['whatsapp', 'telegram', 'messenger'],
      novoDialog: false,
      editDialog: false,
      removeDialog: false,
      confirmDialog: false,
      filter: '',
      mode: 'list',
      visibleColumns: ['nome', 'email', 'session', 'master'],

      conta: {
        username: null,
        foto: null,
        nome: null,
        email: null,
        senha: null,
        roleta: false,
        numero: null,
        confirmed: true,
        master: true,
        child_of: null
      }
    }
  },

  methods: {
    blocked() {
      let self = this
      if (!self.conta) return
      const { id } = self.$route.params
      self.conta.blocked = !self.conta.blocked

      self.$api
        .put('/users/' + id, self.conta)
        .then(function ({ data }) {
          self.conta = data
          self.get()
          // console.log(conta);
        })
        .catch((erro) => {
          console.log(erro)
        })
    },
    get() {
      let self = this
      // const { id } = self.$route.params;
      self.$api.get('users?&populate=foto').then((res) => {
        self.conta = res.data
      })
      console
        .log(self.conta)

        .catch((erro) => {
          console.log(erro)
        })
    },

    doRemove() {
      let self = this
      self.selected.forEach((conta) => {
        self.$api.delete('/users/' + conta.id).then((res) => {
          self.get()
          self.selected = []
        })
      })
    },

    remove(rows) {
      let self = this
      self.selected = rows
      self.removeDialog = true
    },

    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.data.map((row) =>
            this.columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === 'function'
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(',')
          )
        )
        .join('\r\n')

      const status = exportFile('conta.csv', content, 'text/csv')

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    },

    editSave() {
      let self = this
      self.salvar()
      self.canEdit = true
    },

    salvar() {
      let self = this
      const { id } = self.$route.params
      self.$api
        .put('/users/' + id, self.conta)
        .then(function (res) {
          self.handleFileUpload()
          self.get()
          if (self.conta.senha && self.conta.senha.length > 0) {
            self.$api.post('/auth/local/reset-password', {
              code: self.conta.id,
              password: self.conta.senha,
              passwordConfirmation: self.conta.senha,
              passwordConfirmation: self.conta.senha
            })
          }
          self.confirmDialog = true
          self.editDialog = false
          self.get()
        })
        .catch(function (err) {
          console.log(err)
        })
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
      const { id } = self.$store.state.app.user.id
      self.$api.put('users/' + id, { foto: foto[0].id }).then((res) => {
        console.log(res)
        self.get()
      })
    }
  },

  computed: {},
  mounted() {
    let self = this
    self.get()
  }
}
</script>

<style scoped></style>