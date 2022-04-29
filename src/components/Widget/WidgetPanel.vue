<template>
  <section>
    <q-tabs
      dense
      v-model="selectedTab"
      align="center"
      class="q-mt-md bg-white text-gray-2 shadow-0 fit"
    >
      <q-tab no-caps name="config" label="Configurações" />
      <q-tab no-caps name="traducao" label="Traduções" />
    </q-tabs>
    <q-tab-panels v-model="selectedTab" animated class="fit q-mt-md">
      <q-tab-panel name="config" class="q-pa-none">
        <ConfigTab />
      </q-tab-panel>
      <q-tab-panel name="traducao" class="q-pa-none">
        <Soon />
      </q-tab-panel>
    </q-tab-panels>
  </section>
</template>

<script>
import ConfigTab from './ConfigTab'
import Soon from '../Soon.vue'
export default {
  components: {
    ConfigTab,
    Soon
  },
  data() {
    return {
      selectedTab: 'config'
    }
  }
}
</script>

<style>
</style>