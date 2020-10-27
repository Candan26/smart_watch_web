<template>
  <div>
    <select v-model="selected">
      <option disabled value="">Please select one</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <span>Selected: {{ selected }}</span>

    <date-picker id="datePicker" v-model="range" lang="en" range :shortcuts="shortcuts"></date-picker>
  </div>
</template>

<script>

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  name: 'Date',
  components: {
    DatePicker
  },
  data() {
    return {
      date: '',
      time: '',
      timePickerOptions: {
        star: '00:00',
        step: '00:30',
        end: '23:30'
      },
      datetime: '',
      range: '',
      shortcuts: [
        {
          text: 'Today',
          onclick: () => {
            this.range = [new Date(), new Date()]
          }
        }
      ]
      ,
      games: [
        {'value': 1, 'text': 'Game 1'},
        {'value': 4, 'text': 'Game 4'}
      ]
    }
  }
}
</script>


<style>


</style>