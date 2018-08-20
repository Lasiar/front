<template>
  <v-toolbar>

    <v-menu
      ref="showCalendar"
      :close-on-content-click="false"
      v-model="showCalendar"
      :nudge-right="40"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <v-text-field
        @change="searched"
        slot="activator"
        v-model="date"
        prepend-icon="event"
        label="Выберите период"
        readonly
        single-line

      ></v-text-field>
      <v-date-picker
        @change="getData"
        locale="ru-Latn"
        v-model="date"
        @input="$refs.showCalendar.save(date)
        $emit('change', date)"
        :first-day-of-week="1"
      ></v-date-picker>
    </v-menu>

    <v-btn flat @click="getData">
      <v-icon>refresh</v-icon>
    </v-btn>


    <v-spacer></v-spacer>


    <v-btn @click="deleteInDB" flat :disabled="enable">удалить строки {{countSelected}}</v-btn>

    <v-btn flat @click="update">
      <v-icon>save_alt</v-icon>
    </v-btn>

    <v-card-title>
      <v-autocomplete
        @update:searchInput="searched"
        v-model="search"
        lazy
        clearable
        append-icon="search"
        label="Поиск"
        single-line
        :items="searchList"
        hide-details
      ></v-autocomplete>
    </v-card-title>
  </v-toolbar>

</template>

<script>
  import {bus} from '../../main'

  export default {
    name: 'toolbar',
    props: ['selected', 'searchList', 'message'],
    data: () => ({
      date: '',
      showCalendar: false,
      search: ''
    }),
    computed: {
      enable () {
        return this.selected.length === 0
      },
      countSelected () {
        return this.selected.length > 0 ? this.selected.length : ''
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        this.$emit('getData', this.date)
      },
      deleteInDB () {
        bus.$emit('deleteInDB', this.date)
      },
      searched () {
        bus.$emit('searched', this.search)
      },
      update () {
        bus.$emit('update')
      }
    }
  }
</script>

<style scoped>

</style>
