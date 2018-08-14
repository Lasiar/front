<template>
  <div>
    <toolbar :selected="selected" @send="dialog=true" :search-list="searchList" :message="message"/>
    <v-data-table
      :loading="isLoading"
      :headers="headers"
      :items="dataTable"
      v-model="selected"
      hide-actions
      select-all
      :search="search"
      class="elevation-12"
    >
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox
            v-model="props.selected"
            primary
            hide-details
          ></v-checkbox>
        </td>
        <td class="text-xs-center">{{ props.item.date }}</td>
        <td class="text-xs-center">{{ props.item.time }}</td>
        <td class="text-xs-center">{{ props.item.indicator }}</td>
        <td class="text-xs-center">{{ props.item.location_name }}</td>
        <td class="text-xs-center" :class="changed.get(props.item.id) !== undefined ? 'changed-cells' : '' ">
          <v-edit-dialog
            :return-value.sync="props.item.value"
            lazy
            @save="save(props.item)"
            @cancel="cancel"
            @open="open"
            @close="close"
          >
            {{ props.item.value }}
            <v-text-field
              :rules="[rules.float, rules.required]"
              slot="input"
              v-model="props.item.value"
              label="Edit"
              :suffix="props.item.measure"
              single-line
            ></v-text-field>
          </v-edit-dialog>
        </td>
      </template>

      <v-alert slot="no-results" :value="true" color="warning" icon="warning">
        По заданному запросу: "{{ search }}" ничего не найдено.
      </v-alert>

      <v-alert slot="no-data" :value="true" type="warning">
        {{message}}
      </v-alert>

    </v-data-table>

    <snackbar :snack-color="snackColor" :snack="snack" :snack-text="snackText"/>

    <upload :items="Array.from(this.changed.values())" />

  </div>
</template>

<script>
  import axios from 'axios'
  import Toolbar from './toolbar'
  import {bus} from '../../main'
  import {headers} from '../mixins'
  import Snackbar from './snackbar'
  import Upload from './upload'

  export default {
    name: 'ecoLabEdit',
    components: {Upload, Snackbar, Toolbar},
    mixins: [headers],
    data: () => ({
      isLoading: false,
      changed: new Map(),
      snack: false,
      snackColor: '',
      snackText: '',
      selected: [],
      search: '',
      message: '',
      dataTable: [],
      date: false,
      searchDate: '',
      rules: {
        required: value => !!value || 'Required.',
        float: value => {
          const pattern = /^[+-]?\d+(\.\d+)?$/
          return pattern.test(value) || 'Десятичные числа, через точку'
        }
      }
    }),
    computed: {
      countSelected () {
        if (this.isSelected) {
          return ''
        } else {
          return this.idSelected.length
        }
      },
      isSelected () {
        return (this.idSelected.length === 0)
      },
      idSelected () {
        var arr = []
        this.selected.forEach(element => arr.push(element.id))
        return arr
      },
      searchList () {
        var mySet = new Set()
        this.dataTable.forEach((element) => {
          mySet.add(element.indicator)
          mySet.add(element.location_name)
        })
        return Array.from(mySet)
      }
    },
    created () {
      bus.$on('getData', data => {
        this.getData(data)
      })
      bus.$on('deleteInDB', data => {
        this.deleteInDB(data)
      })
      bus.$on('searched', data => {
        this.search = data
      })
    },
    destroyed () {
      bus.$off('getData')
      bus.$off('deleteInDB')
      bus.$off('searched')
    },
    methods: {
      save (item) {
        this.changed.set(item.id, item)
        console.log(this.changed)
        this.snackColor = 'success'
        this.snackText = 'Информация сохранена, для загрузки нажмите кнопку сверху'
      },
      cancel () {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'отменнено'
      },
      open () {
        this.snack = true
        this.snackColor = 'info'
        this.snackText = 'Начало редактирования'
      },
      close () {
        console.log('Dialog closed')
      },
      getData (date) {
        let self = this
        self.isLoading = true
        axios.get('http://127.0.0.1:9000/get-data', {
          params: {
            date: date
          }
        })
          .then(
            (response) => {
              if (response.data.table === null) {
                self.message = response.data.message
                self.dataTable = []
              } else {
                self.dataTable = response.data.table
              }
            }
          )
          .catch(
            (error) => {
              self.message = 'Ошибка! Не могу связаться с API: ' + error
            })
        self.isLoading = false
      }
    },
    deleteInDB (date) {
      console.log(date)
      let self = this
      self.isLoading = true
      axios.post('http://127.0.0.1:9000/delete', {
        id: self.idSelected
      })
        .then(
          (response) => {
            console.log(response)
          }
        )
        .catch(
          (error) => {
            self.info = 'Ошибка! Не могу связаться с API: ' + error
            self.success = false
          })
        .finally(
          () => {
            self.isLoading = false
            self.selected = []
            self.getData(date)
          })
    }
  }
</script>

<style scoped>
  .changed-cells {
    background: #00C853;
  }
</style>
