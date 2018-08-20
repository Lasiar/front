<template>
  <div id="upload-dialog">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Предварительный просмотр</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="items"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.date }}</td>
            <td class="text-xs-center">{{ props.item.time }}</td>
            <td class="text-xs-center">{{ props.item.indicator }}</td>
            <td class="text-xs-center">{{ props.item.location_name }}</td>
            <td class="text-xs-center">{{ props.item.value }}</td>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {bus} from '../../main'
  import {table} from '../mixins'

  export default {
    name: 'updated',
    mixins: [table],
    data: () => ({
      dialog: false
    }),
    created () {
      bus.$on('upload', () => {
        this.dialog = true
      })
    }
  }
</script>

<style scoped>

</style>
