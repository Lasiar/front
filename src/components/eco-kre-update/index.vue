<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs6>
          <CardDate :save-date=message[0] name="all"></CardDate>
        </v-flex>
        <v-flex xs6>
          <card-date :save-date=message[1] name="pb"></card-date>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import axios from 'axios'
  import DataPicker from './Datapicker'
  import CardDate from './CardDate'

  export default {
    components: {CardDate, DataPicker},
    name: 'updateOperative',
    data () {
      return {
        message: [{
          who: String,
          date_start: String,
          date_finish: String
        }, {
          who: String,
          date_start: String,
          date_finish: String
        }],
        error: ''

      }
    },
    mounted () {
      let self = this
      self.isLoading = false
      axios.post('http://srv-prod:8085/get-date')
        .then(
          response => {
            self.message = response.data
          })
        .catch(
          error => {
            self.error = error.message
          })
        .finally(
          () => {
            self.isLoading = true
          })
      self.showModal = true
    }
  }
</script>
