<template>
  <div class="q-pa-md q-gutter-sm">
    <h1></h1>
    <q-drawer>
      <h1></h1>
    </q-drawer>
    <q-table
      :style="
        $q.dark.isActive
          ? { 'background-color': 'black' }
          : { 'background-color': 'white' }
      "
      title="Leads"
      :data="leads"
      :columns="columns"
      row-key="id"
      :pagination.sync="pagination"
      :hide-header="mode === 'grid'"
      :grid="mode == 'grid'"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      binary-state-sort
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template v-slot:top-right="props">
        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Pesquisar "
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          flat
          color="primary"
          label="BUSCAR"
          @click="
            onRequest({
              pagination: pagination,
              filter: undefined
            })
          "
        />
        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          v-if="mode === 'list'"
        >
          <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
            >{{ props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen' }}
          </q-tooltip>
        </q-btn>

        <q-btn
          flat
          round
          dense
          :icon="mode === 'grid' ? 'list' : 'grid_on'"
          @click="
            mode = mode === 'grid' ? 'list' : 'grid'
            separator = mode === 'grid' ? 'none' : 'horizontal'
          "
          v-if="!props.inFullscreen"
        >
          <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
            >{{ mode === 'grid' ? 'List' : 'Grid' }}
          </q-tooltip>
        </q-btn>

        <q-btn
          color="primary"
          icon-right="archive"
          label="Exportar csv"
          no-caps
          @click="exportTable"
        />
      </template>

      <template v-slot:body-cell-email="props">
        <q-td :props="props">
          <div>
            {{
              props.row.email && props.row.email.length > 0
                ? props.row.email
                : '-'
            }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-respondido="props">
        <q-td :props="props">
          <div>
            <q-badge
              :color="props.row.respondido ? 'green' : 'red'"
              :label="props.row.respondido ? 'SIM' : 'NÃO'"
            />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-respondido_por="props">
        <q-td :props="props">
          <div>
            <q-badge
              :label="
                props.row.respondido_por ? props.row.respondido_por.nome : '-'
              "
            />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-criado_em="props">
        <q-td :props="props">
          <div>
            <q-badge
              text-color="black"
              color="grey-4"
              :label="timeToL(props.row.created_at)"
            />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-atualizado_em="props">
        <q-td :props="props">
          <div>
            <q-badge
              text-color="black"
              color="grey-4"
              :label="timeToL(props.row.updated_at)"
            />
          </div>
        </q-td>
      </template>
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-3 col-md-3">
          <q-card>
            <q-card-section class="text-center">
              <strong>{{ timeToL(props.row.created_at) }}</strong>
            </q-card-section>
            <q-separator />
            <q-card-section
              :style="{
                'background-image': $q.dark.isActive
                  ? 'url(/darkbg.jpg)'
                  : 'url(/wabg.png)',
                'background-size:': '400px 400px',
                'background-repeat': 'repeat'
              }"
            >
              <q-chat-message
                :sent="false"
                :name="`<strong>${props.row.nome}</strong>`"
              >
                <q-markdown :src="props.row.motivo" />
              </q-chat-message>
            </q-card-section>
            <q-card-section
              v-if="props.row.respondido && props.row.respondido_por"
              class="text-center"
              >Respondido por
              <strong> {{ props.row.respondido_por.nome }}</strong> em
              {{ timeToL(props.row.updated_at) }}
            </q-card-section>
            <q-card-section v-if="!props.row.respondido" class="text-center"
              >Ninguém respondeu a este lead ainda.
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-btn
                align="around"
                class="btn-fixed-width"
                :disable="props.row.respondido"
                :color="props.row.respondido ? 'grey' : 'green-5'"
                icon="fab fa-whatsapp"
                @click="talkTo(props.row)"
              />
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import moment from 'moment'
import { exportFile } from 'quasar'

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val

  formatted =
    formatted === void 0 || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')

  return `"${formatted}"`
}
export default {
  data() {
    return {
      tab: 'Atendimentos',
      options: ['nome', 'email', 'telefone', 'respondido'],
      buscar_por: 'nome',
      leads: [],
      mode: 'list',
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'Id',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      columns: [
        // { name: "id", label: "Id", field: "id", sortable: true },
        {
          name: 'nome',
          label: 'Nome',
          field: 'nome',
          sortable: true
        },
        {
          name: 'email',
          label: 'Email',
          field: 'emai;',
          sortable: true
        },
        {
          name: 'telefone',
          label: 'Whatsapp',
          field: 'telefone',
          sortable: true
        },
        {
          name: 'motivo',
          label: 'Mensagem',
          field: 'motivo',
          sortable: true
        },
        {
          name: 'respondido',
          label: 'Respondido',
          field: 'respondido',
          sortable: true
        },
        {
          name: 'respondido_por',
          label: 'Operador',
          field: 'respondido_por.nome',
          sortable: true
        },
        {
          name: 'criado_em',
          label: 'Criado em',
          field: 'created_at',
          sortable: true
        },
        {
          name: 'atualizado_em',
          label: 'Atualizado em',
          field: 'updated_at',
          sortable: true
        }
      ]
    }
  },
  computed: {
    user() {
      return this.$store.state.app.user
    },
    state() {
      return this.$store.state
    },
    session() {
      return this.$store.state.app.session
    }
  },
  methods: {
    timeToL(t) {
      return moment(t).locale('pt-br').format('D  MMM - LT')
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

      const status = exportFile('callwhats-operadores.csv', content, 'text/csv')

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    },
    talkTo(row) {
      let self = this
      this.$socket.client.emit('message', {
        id: `${row.telefone}@s.whatsapp.net`,
        msg: `${self.user.username} iniciou o atendimento...`,
        channel: 'whatsapp',
        from: this.$store.state.app.user.email
      })

      this.$q.notify({
        position: 'bottom-right',
        progress: true,
        message: 'Enviando mensagem',
        color: 'green'
      })

      let lead = row
      lead.respondido = true
      lead.respondido_por = self.user

      self.$api
        .put(`/leads/${lead.id}`, lead)
        .then(function (res) {
          console.log(res)
        })
        .catch(function (err) {
          console.log(err)
        })
      this.$router.push('/whatsapp')
      // fetch data from "server"
      let _params = {
        _start: startRow,
        _limit: fetchCount,
        filter: filter,
        sort: sortBy,
        desc: descending,
        dono_eq: self.user.child_of ? self.user.child_of.id : self.user.id
        // respondido_null: true,
      }

      self.get(_params)
    },
    onRequest(props) {
      let self = this
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter

      this.loading = true

      // emulate server
      setTimeout(async () => {
        // update rowsCount with appropriate value
        await this.getCount(filter)

        // get all rows if "All" (0) is selected
        const fetchCount =
          rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage

        // fetch data from "server"
        let _params = {
          _start: startRow,
          _limit: fetchCount,
          filter: filter,
          sort: sortBy,
          desc: descending,
          dono_eq: self.user.child_of ? self.user.child_of.id : self.user.id
        }

        this.get(_params)
        this.loading = false
        // clear out existing data and add new
        //this.atendimentos.splice(0, this.data.length, ...returnedData);

        // don't forget to update local pagination object
        this.pagination.page = page
        this.pagination.rowsPerPage = rowsPerPage
        this.pagination.sortBy = sortBy
        this.pagination.descending = descending

        // ...and turn of loading indicator
      }, 1500)
    },
    getCount: function (filter = null) {
      let self = this
      let _params = {
        _limit: -1,
        dono_eq: self.user.id
      }

      _params[`${self.buscar_por}_contains`] = self.filter
      this.$api
        .get('leads/count', { params: _params })
        .then(function (res) {
          self.pagination.rowsNumber = res
        })
        .catch(function (err) {})
    },
    get: function (params = null) {
      let self = this
      let _params = {
        _limit: params._limit,
        _start: params._start,
        _sort: 'created_at:desc',
        dono_eq: self.user.child_of ? self.user.child_of.id : self.user.id
        // respondido: false,
      }
      _params[`${self.buscar_por}_contains`] = self.filter

      self.$api
        .get('/leads', { params: _params })
        .then(function (res) {
          console.log(res)
          self.leads = res.data
        })
        .catch(function (err) {})
    }
  },
  mounted: async function () {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })

    // setInterval(() => {
    //   this.onRequest({
    //     pagination: this.pagination,
    //     filter: undefined,
    //   });
    //   console.log("verificando leads...");
    // }, 30000);
  }
}
</script>

<style>
</style>