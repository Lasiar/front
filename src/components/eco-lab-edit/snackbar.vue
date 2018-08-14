<template>
  <div>
  <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
    {{ snackText }}
  </v-snackbar>
  </div>
</template>

<script>
  export default {
    name: 'snackbar',
    props: ['snack', 'snackColor', 'snackText']
  }
</script>

<style scoped>

</style>
