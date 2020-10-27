<template>
  <div id="app">

    <!-- <p v-if="isLoading">Loading...</p>-->
    <!-- <search></search> -->
    <!-- <search v-on:SearchRequested="handleSearch"></search>-->
    <!--<Preview :gifs=gifs></Preview> -->
    <!--<PieChartTest></PieChartTest>-->
  <VueChart></VueChart>
  <VueTable></VueTable>
</div>
</template>

<script>
//import Search from './components/Search'
//import Preview from "@/components/Preview";
import VueChart from "@/components/VueChart";
import VueTable from './components/VueTable';
//import PieChartTest from './components/PieChartTest';
export default {
name: 'App',
components: {
  //PieChartTest,
  VueTable,
  VueChart
  //Search
  //,
  //Preview
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
          console.log(res);
          this.gifs = res.data;
          this.isLoading = false;
        })
  }
},
created() {
  /*
  fetch('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        console.log(res);
        this.gifs = res.data;
        this.isLoading=false;
      })
   */
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
