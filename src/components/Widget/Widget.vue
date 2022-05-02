<template>
  <section style="overflow: hidden">
    <q-card flat class="widget-desktop">
      <q-card-section>
        <div class="box flex flex-center">
          <q-chat-message
            class="box"
            sent
            :name="name"
            :text="[widgetMessage]"
          />
          <q-btn class="box" style="margin-top: 15px" round>
            <q-avatar size="42px">
              <img src="https://live.callwhats.net/icons/whatsapp.svg" />
            </q-avatar>
          </q-btn>
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
  props: ['name', 'widgetMessage'],
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