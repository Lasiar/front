<template>
    <div>
      <v-data-table
        :loading="isLoading"
        :headers="headers"
        :items="items"
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

      </v-data-table>b
    </div>
</template>

<script>
  import {table} from '../mixins'
  import {bus} from '../../main'

  export default {
    name: 'mainTalble',
    mixins: [table],
    created () {
      bus.$on('searched', data => {
        this.search = data
      })
    }
  }
</script>

<style scoped>

</style>
