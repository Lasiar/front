export const table = {
  props: {
    items: {
      type: Array
    },
    isLoading: {
      default: false,
      type: Boolean
    }
  },
  data: () => ({
    headers: [
      {text: 'Дата', align: 'center', value: 'date'},
      {text: 'Время', align: 'center', value: 'time'},
      {text: 'Вещество', align: 'center', value: 'indicator'},
      {text: 'Местонахождение', align: 'center', value: 'location_name'},
      {text: 'Значение', align: 'center', value: 'value'}
    ]
  })
}
