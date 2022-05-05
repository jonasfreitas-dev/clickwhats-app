<template>
  <q-page class="q-ma-sm container">
    <div class="q-mt-md q-pa-md">
      <label class="tittle">Meus Widgets</label>
      <q-btn
        @click="addWidget"
        flat
        rounded
        color="primary"
        size="md"
        style="margin-top: -4px"
        label="+ Adicionar"
      />
    </div>

    <div class="flex row flex-start q-gutter-sm">
      <q-card
        paddin
        bordered
        class="card"
        v-for="(widget, index) in widgets"
        :key="index"
        ><p></p>
        <div @click="goTo(widget)" class="text-center">
          <strong>{{ widget.nome }}</strong>
        </div>
        <div class="text-center">
          <div style="font-size: 0.8em" class="text-grey">
            Use sua conta do WhatsApp
          </div>
          <div style="font-size: 0.8em" class="text-grey">
            para suporte e vendas
          </div>
        </div>
        <q-separator />
        <q-card-section paddin class="text-center">
          <q-list dense paddin>
            <div v-for="(agent, index) in widget.agents" :key="index">
              <q-item scroll-target v-if="index < 2" v-ripple>
                <q-item-section topo avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section
                  lines="2"
                  flat
                  rounded
                  no-caps
                  style="font-size: 0.7em"
                  class="text-center"
                  @click="to(agent)"
                  >{{ agent.nome }}</q-item-section
                >
                <q-space />
                <q-btn flat rounded no-caps class="text-blue">Clone</q-btn>
              </q-item>
            </div>
            <q-item v-if="index < 2" v-ripple>
              <q-item-section dense top>
                <q-btn
                  flat
                  no-caps
                  dense
                  rounded
                  style="font-size: 1em"
                  class="text-blue"
                  @click="goTo(widget)"
                >
                  <q-icon style="font-size: 1.5em" name="person_search" />

                  Ver agentes
                </q-btn>
              </q-item-section>
            </q-item>
            <q-separator />
            <p></p>
            <q-card flat>
              <q-item-section dense top>
                <q-btn
                  flat
                  no-caps
                  dense
                  rounded
                  style="font-size: 0.8em"
                  class="text-blue"
                  @click="addAgent"
                >
                  <q-icon style="font-size: 1.5em" name="add_circle" />

                  Add novo agente
                </q-btn>
              </q-item-section>
              <q-item-section dense top>
                <q-btn
                  flat
                  dense
                  no-caps
                  rounded
                  style="font-size: 0.8em"
                  class="text-blue"
                >
                  <q-icon style="font-size: 1.5em" name="edit" />
                  Editar landing page</q-btn
                >
              </q-item-section>
              <q-item-section dense top>
                <q-btn
                  flat
                  dense
                  no-caps
                  rounded
                  style="font-size: 0.8em"
                  class="text-blue"
                >
                  <q-icon style="font-size: 1.5em" name="article" />

                  Ir para landing page</q-btn
                >
              </q-item-section>
            </q-card>
          </q-list>
        </q-card-section>
      </q-card>
      <q-card bordered @click="addWidget" class="card-add">
        <q-card-section class="text-center">
          <label style="font-size: 1.2rem">Adicionar widget</label>
        </q-card-section>
        <q-card-section class="text-center">
          <label style="font-size: 1rem" class="wrap">
            Crie um novo <br />widget para seu site
          </label>
        </q-card-section>
        <q-card-section class="text-center" style="font-size: 2rem">
          <q-icon name="add_circle" />
        </q-card-section>
      </q-card>
      <q-card bordered class="card-premium">
        <q-card-section class="text-center">
          <label style="font-size: 1.2rem">ILIMITADO</label>
        </q-card-section>
        <q-card-section class="text-center">
          <label style="font-size: 1.6rem"
            >39,90<label style="font-size: 1rem">/mês</label></label
          >
        </q-card-section>
        <q-card-section class="text-center">
          <q-btn color="orange" class="full-width text-black" size="sm">
            <div style="font-size: 0.8rem" class="row items-center no-wrap">
              Ative sua <br />conta premium
            </div></q-btn
          >
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      widgets: []
      // agents: []
    }
  },
  methods: {
    addWidget() {
      let self = this
      self.$router.push('widget/new')
    },

    addAgent() {
      let self = this
      self.$router.push('agent/new')
    },

    goTo(widget) {
      let self = this
      self.$router.push('widget/' + widget.uuid)
    },

    to(agent) {
      let self = this
      self.$router.push('agent/' + agent.id)
    },

    getWidgets() {
      let self = this
      const { id } = self.$store.state.app.user
      const qs = require('qs')
      const query = qs.stringify({
        where: {
          child_of: {
            id: id
          }
        }
      })
      self.$api
        .get(`widgets/findWidgets?${query}`)
        .then(({ data }) => {
          self.widgets = data.map((item) => {
            return { ...item }
          })
          console.log(self.widgets)
        })

        .catch((erro) => {
          console.log(erro)
        })
    },
    getAgents() {
      let self = this
      const { id } = self.$store.state.app.user
      const qs = require('qs')
      const query = qs.stringify({
        where: {
          child_of: {
            id: id
          }
        }
      })
      self.$api
        .get('agents')
        .then(({ data }) => {
          self.agents = data.map((item) => {
            return {
              id: item.id,
              // uuid: item.uuid,
              nome: item.nome,
              child_of: item.child_of
            }
          })
          console.log(self.agents)
        })

        .catch((erro) => {
          console.log(erro)
        })
    }
  },

  mounted() {
    let self = this
    self.getWidgets()
    self.getAgents()
  }
}
</script>

<style>
.tittle {
  font-size: 1.5rem;
  font-weight: 500;
}

.card {
  height: 350px;
  width: 300px;
  border-radius: 10px;
  cursor: pointer;
}
.card .card-tittle {
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
}

.card-add {
  height: 350px;
  width: 300px;
  border-radius: 10px;
  color: gray;
  background-color: whitesmoke;
  cursor: pointer;
}

.card-premium {
  min-height: 350px;
  min-width: 300px;
  border-radius: 10px;
  color: white;
  background-color: blueviolet;
  cursor: pointer;
}
</style>