<template>
  <q-page class="q-mt-md">
    <div class="row q-ma-md"><label style="font-size: 2rem">Widget</label></div>
    <div class="row">
      <q-tabs
        dense
        v-model="tab"
        align="left"
        class="bg-white text-gray shadow-1 fit"
        :breakpoint="0"
      >
        <q-btn class="q-ml-md" flat color="gray" icon="home" to="/" />
        <q-tab no-caps name="widget" label="Widget" />
        <q-tab no-caps name="agents" label="Agentes" />
        <q-tab no-caps name="forms" label="Chat Forms" />
        <q-tab no-caps name="leads" label="Leads">
          <q-badge floating transparent align="top" color="green" label="0" />
        </q-tab>
        <q-tab no-caps name="stats" label="Stats">
          <q-badge floating transparent align="top" color="green" label="0"
        /></q-tab>
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated class="fit q-mt-md">
        <q-tab-panel name="widget" class="q-pa-none">
          <WidgetPanel />
        </q-tab-panel>
        <q-tab-panel name="agents" class="q-pa-none"> </q-tab-panel>
        <q-tab-panel name="forms" class="q-pa-none">
          <div class="row my-card">
            <div class="col-sm-12">
              <q-card class="fit bg-grey-1">
                <q-card-section>
                  <q-list>
                    <q-list-item
                      v-for="(item, index) in flow.nodes"
                      :key="index"
                    >
                      <q-card class="q-mt-md q-pa-lg">
                        <q-card-section>
                          <label>{{ item.pergunta }}</label>
                        </q-card-section>
                      </q-card>
                    </q-list-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <q-btn
            fab
            style="position: fixed; bottom: 10px; right: 5px; margin-top: -10px"
            color="primary"
            label="+"
            @click="add"
          ></q-btn>
        </q-tab-panel>
        <q-tab-panel name="leads" class="q-pa-none"> </q-tab-panel>
        <q-tab-panel name="stats" class="q-pa-none"> </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script>
import WidgetPanel from '../components/Widget/WidgetPanel'
export default {
  name: 'Widget',
  components: {
    WidgetPanel
  },
  data() {
    return {
      tab: 'widget',
      widgetSelectTab: 'config',
      novaPergunta: '',
      flowSelectedIndex: 0,
      nodeSelectedIndex: 0,
      flows: [
        {
          name: 'Exemplo de Script 1',
          selected: true,
          nodes: [
            {
              pergunta: 'Olá! Seja bem vindo!',
              resposta: '',
              variavel: 'nome',
              edit: false
            }
          ],
          variaveis: {}
        },
        {
          name: 'Exemplo de Script 2',
          selected: false,
          nodes: [],
          variaveis: {}
        },
        {
          name: 'Exemplo de Script 3',
          selected: false,
          nodes: [],
          variaveis: {}
        },
        {
          name: 'Exemplo de Script 4',
          selected: false,
          nodes: [],
          variaveis: {}
        }
      ]
    }
  },
  computed: {
    flow() {
      return this.flows[this.flowSelectedIndex]
    }
  },
  methods: {
    add() {
      let self = this
      self.flow.nodes.push({
        pergunta: self.novaPergunta,
        resposta: ''
      })
      self.novaPergunta = ''
      self.variaveis[self.variavel]
    }
  }
}
</script>
<style scoped>
.my-card {
  min-width: 360px;
  height: calc(100vh - 54px);
}
.script-title {
  font-weight: bold;
}
</style>