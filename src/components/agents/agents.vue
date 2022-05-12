<template>
  <div class="q-pa-md">
    <q-table
      title="Operadores"
      flat
      dense
      :filter="filter"
      bordered
      selection="multiple"
      :data="data"
      :columns="columns"
      :hide-header="mode === 'grid'"
      :grid="mode == 'grid'"
      :selected.sync="selected"
      row-key="id"
    />

    <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: [],
      columns: [
        { name: 'foto', label: 'foto', field: 'foto.url', sortable: false },
        { name: 'nome', label: 'Nome', field: 'nome', sortable: true },
        {
          name: 'contato',
          label: 'Telefone',
          field: 'contato',
          sortable: true
        },
        {
          name: 'actions',
          label: 'Ações',
          field: 'actions',
          sortable: false
        }
      ],
      data: []
    }
  },
  methods: {
    getSelectedString() {
      return this.selected.length === 0
        ? ''
        : `${this.selected.length} record${
            this.selected.length > 1 ? 's' : ''
          } selected of ${this.data.length}`
    },

    get() {
      let self = this
      // const id = self.$store.state.app.user.id;
      self.$api
        .get('operadores?populate=foto', {
          // child_of: id,
        })
        .then(({ data }) => {
          self.data = data.data.map((item) => {
            return { id: item.id, ...item.attributes }
          })
        })
    }
  },

  mounted() {
    let self = this
    self.get()
  }
}
</script>
