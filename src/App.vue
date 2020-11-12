<template>
  <div id="app">
    <div>
      <VueChart></VueChart>
    </div>
    <div>
      <VueTable></VueTable>
    </div>
  </div>
</template>

<script>
import VueChart from "@/components/VueChart";
import VueTable from './components/VueTable';
import Emitter from 'event-emitter';

window.events = new Emitter();
export default {
  name: 'App',
  components: {
    VueTable,
    VueChart
  },
  data() {
    return {}
  },
  methods: {},
  created() {
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}

</style>
