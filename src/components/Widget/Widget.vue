<template>
  <section style="overflow: hidden">
    <q-card flat class="widget-desktop">
      <q-card-section>
        <div class="box flex flex-center">
          <q-card v-if="box === true" style="min-width: 300px">
            <div class="row justify-end">
              <q-btn flat @click="box = !box"><q-icon name="close" /></q-btn>
            </div>
            <q-card>
              <div class="row justify-center">
                <q-avatar v-if="enpresaLlogo.url" size="70px">
                  <img
                    :src="`https://wild-donkeys-pick-138-117-223-71.loca.lt${enpresaLlogo[0].url}`"
                  />
                </q-avatar>
                <q-avatar v-else size="42px">
                  <img src="/img/defaultuser.png" />
                </q-avatar>
              </div>
            </q-card>
            <p />
            <div class="row justify-center">{{ widgetMsg }}</div>
            <p />
            <q-separator />
            <q-list dense paddin>
              <div v-for="(agent, index) in agents" :key="index">
                <q-item scroll-target v-if="index < 2" v-ripple>
                  <q-item-section topo avatar>
                    <q-avatar>
                      <img src="/img/defaultuser.png" />
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
                </q-item>
              </div>
            </q-list>
          </q-card>
          <div v-if="box === false">
            <label @click="box = !box">{{ msgBtn }}</label>
            <q-btn @click="box = !box" class="msgBtn" round>
              <q-avatar v-if="whatsAppIcon.url" size="42px">
                <img
                  :src="`https://wild-donkeys-pick-138-117-223-71.loca.lt${whatsAppIcon[0].url}`"
                />
              </q-avatar>
              <q-avatar v-else size="42px">
                <img src="/img/defaultuser.png" />
              </q-avatar>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </section>
</template>

<script>
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(TextPlugin)

export default {
  props: [
    'name',
    'widgetMsg',
    'msgBtn',
    'enpresaLlogo',
    'whatsAppIcon',
    'agents'
  ],
  data() {
    return {
      box: false
    }
  },
  methods: {},
  mounted() {
    gsap.from('.box', 2.4, {
      opacity: 0,
      x: -100,
      ease: 'bounce.out'
    })
  }
}
</script>

<style>
.widget-desktop {
  position: absolute;
  bottom: 0;
  right: 0;
}
.icon {
  border-radius: 50px;
}
</style>