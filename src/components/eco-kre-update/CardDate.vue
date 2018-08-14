<template>
  <div>
    <v-card color="text-align: center">
      <div>
        <h3 class="headline mb-0">{{substance}}</h3>
        <div v-if="saveDate.who === name"> Текущая дата <br>
          Начало: <b> {{existDateStart}}</b> <br>
          Конец: <b>  {{existDateFinish}}</b></div>
      </div>

      <DataPicker :save-date=saveDate.date_start @change="getStartDate" atr="Начало"/>
      <DataPicker :save-date=saveDate.date_finish @change="getFinishDate" atr="Конец"/>
      <v-btn
        @click.native="update"
        :loading="!isLoading"
        :disabled="!valid"
      >
        Обновить
      </v-btn>
    </v-card>


    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline"> {{substance}}</v-card-title>

        <v-card-text>
          {{info}}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </div>
</template>


<script>
  import DataPicker from './Datapicker'
  import axios from 'axios'

  export default {
    components: {DataPicker},
    name: 'CardDate',
    props: {
      name: String,
      saveDate: {
        who: '',
        date_start: '',
        date_finish: ''
      }
    },
    data: () => ({
      date_start: '',
      date_finish: '',
      message: '',
      info: '',
      success: '',
      isLoading: true,
      dialog: false
    }),
    methods: {
      getStartDate (data) {
        this.date_start = data
      },
      getFinishDate (data) {
        this.date_finish = data
      },
      update () {
        let self = this
        self.isLoading = false
        axios.post('http://srv-prod:8085/update', {
          who: this.name,
          date_start: this.date_start,
          date_finish: this.date_finish
        })
          .then(
            response => {
              if (response.data.success) {
                self.info = 'обновлено'
                self.success = true
              } else {
                console.log(response)
                self.info = 'не обновлено'
                self.success = false
              }
            })
          .catch(
            (error) => {
              self.info = 'Ошибка! Не могу связаться с API: ' + error
              self.success = false
            })
          .finally(
            () => {
              self.dialog = true
              self.isLoading = true
            })
      }
    },
    computed: {
      substance () {
        return this.name === 'pb' ? 'Свинец' : 'Все остальное'
      },
      existDateStart () {
        return this.saveDate.date_start
      },
      existDateFinish () {
        return this.saveDate.date_finish
      },
      valid () {
        let self = this
        if (this.date_start === '') {
          self.message = ''
          return false
        }
        if (this.date_finish === '') {
          self.message = ''
          return true
        }
        if (this.date_start > this.date_finish) {
          self.message = 'Первая дата не может быть больше второй!'
          return false
        } else {
          self.message = ''
          return true
        }
      }

    }
  }
</script>
