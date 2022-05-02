<template>
  <q-page class="q-ma-sm container">
    <div class="q-mt-md q-pa-md">
      <label class="tittle">Meus Widgets</label>
      <q-btn
        flat
        rounded
        color="primary"
        size="md"
        style="margin-top: -4px"
        label="+ Adicionar"
        @click="add"
      ></q-btn>
    </div>

    <div class="flex row flex-start q-gutter-sm">
      <q-card
        bordered
        class="card"
        v-for="(widget, index) in widgets"
        :key="index"
        @click="goTo(widget)"
      >
        <q-card-section class="text-center">
          <label class="card-tittle">{{ widget.name }}</label>
        </q-card-section>
      </q-card>
      <q-card bordered class="card-add">
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
      widgets: [
        {
          uuid: 'abc123',
          name: 'teste 1'
        }
      ]
    }
  },
  methods: {
    add() {},
    goTo(widget) {
      let self = this
      self.$router.push('widget/' + widget.uuid)
    }
  }
}
</script>

<style>
.tittle {
  font-size: 1.5rem;
  font-weight: 500;
}

.card {
  min-height: 200px;
  min-width: 200px;
  border-radius: 10px;
  cursor: pointer;
}
.card .card-tittle {
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
}

.card-add {
  min-height: 200px;
  min-width: 200px;
  border-radius: 10px;
  color: gray;
  background-color: whitesmoke;
  cursor: pointer;
}

.card-premium {
  min-height: 200px;
  min-width: 200px;
  border-radius: 10px;
  color: white;
  background-color: blueviolet;
  cursor: pointer;
}
</style>