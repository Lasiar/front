<template xmlns:>
  <div>

    <v-menu
      ref="start"
      :close-on-content-click="false"
      v-model="start"
      :nudge-right="40"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <v-text-field
        slot="activator"
        v-model="date"
        :label="atr"
        prepend-icon="event"
        readonly
      ></v-text-field>
      <v-date-picker
        :events="events"
        locale="ru-Latn"
        v-model="date"
        @input="$refs.start.save(date)
                    $emit('change', date)"
        :first-day-of-week="1"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
  export default {
    name: 'Datapicker',
    props: {
      atr: String,
      saveDate: String
    },

    data: () => ({
      start: false,
      date: ''
    }),

    computed: {
      events () {
        return [this.saveDate]
      }
    }
  }
</script>

<style scoped>

</style>
