<template>
  <div id="app">

    <!-- <p v-if="isLoading">Loading...</p>-->
    <!-- <search></search> -->
    <!-- <search v-on:SearchRequested="handleSearch"></search>-->
    <!--<Preview :gifs=gifs></Preview> -->
    <!--<PieChartTest></PieChartTest> -->
<div>  <VueChart></VueChart>  </div>
<div> <VueTable></VueTable></div>


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
 return {
   isLoading: true,
   gifs: []
 }
},
methods: {

 handleSearch(query) {
   this.gifs = [];
   this.isLoading = true;

   fetch(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=dc6zaTOxFJmzC`)
       .then((res) => {
         return res.json()
       })
       .then((res) => {
         this.gifs = res.data;
         this.isLoading = false;
       })
 }
},
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
