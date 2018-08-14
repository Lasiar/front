<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <div class="example-simple">
          <v-card color="text-align: center">
            <h1>Загрузка данных для экопаспорта в формате excel</h1>
            <v-card class="upload">
              <ul style="  list-style-type: none;">
                <li v-for="(file, index) in files" :key="file.id">
                  <span> <img src="../../assets/Microsoft-Excel-01-48.png"> {{file.name}}</span> -
                  <span v-if="file.error">Ошибка закгрузки файла {{file.error}}, {{JSON.parse(file.response).message}}</span>
                  <span v-else-if="file.success">Загружен ({{JSON.parse(file.response).message}}) </span>
                  <span v-else-if="file.active">В процессе ({{JSON.parse(file.response).message}}) </span>
                </li>
              </ul>
              <div class="example-btn">
                <file-upload
                  name="file"
                  class="btn btn-primary"
                  post-action="http://srv-prod:8083/update"
                  extensions="xlsx"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  :multiple="true"
                  v-model="files"
                  @input-filter="inputFilter"
                  @input-file="inputFile"
                  ref="upload">
                </file-upload>
                <v-card-actions>
                  <v-btn @click.native="trigger"> Выбрать Файл</v-btn>
                  <v-btn v-if="!$refs.upload || !$refs.upload.active"
                         @click.prevent="$refs.upload.active = true">
                    Загрузить
                  </v-btn>
                  <v-btn type="button" class="btn btn-danger" v-else @click.prevent="$refs.upload.active = false">
                    <i class="fa fa-stop" aria-hidden="true"></i>
                    Прекратить загрузку
                  </v-btn>
                </v-card-actions>

              </div>

            </v-card>
          </v-card>
        </div>
      </v-flex>
    </v-layout>

  </v-container>

</template>


<script>
  import FileUpload from 'vue-upload-component'

  export default {
    name: 'uploadFile',
    components: {
      FileUpload
    },
    data () {
      return {
        files: []
      }
    },

    methods: {
      trigger () {
        this.$refs.upload.$el.click()
      },
      inputFilter (newFile, oldFile, prevent) {
        if (newFile && !oldFile) {
          if (!/\.(xlsx?|html?|jsx?)$/i.test(newFile.name)) {
            return prevent()
          }
        }
      },
      inputFile (newFile, oldFile) {
        if (newFile && !oldFile) {
          // add
        }
        if (newFile && oldFile) {
          // update
        }
        if (!newFile && oldFile) {
          // remove
        }
      }
    }
  }
</script>
