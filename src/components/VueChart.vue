<template>
  <div class="graph-container">

    <button @click="fillData()">Randomize</button>

    <div class="left">
      <h2>Linechart 1</h2>
      <line-chart :chart-data="datacollection" id="myChartLine"></line-chart>
    </div>

    <div class="left"  >
      <canvas id="myChartPie"></canvas>
    </div>
    <vue-options></vue-options>
  </div>
</template>

<script>
import LineChart from '../js/LineChart.js'
import VueOptions from "@/components/VueOptions";

import Chart from 'chart.js'

let data = {
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
      "#F7464A",
      "#46BFBD",
      "#FDB45C"
    ]
  }],
  labels: [
    "Red",
    "Green",
    "Yellow"
  ]
};

export default {
  components: {
    VueOptions,
    LineChart,
  },
  data() {
    return {
      datacollection: null,
    }
  },
  mounted() {

    this.fillData()
    this.createPieChart()

  },

  methods: {
    createPieChart() {
      var canvas = document.getElementById("myChartPie");
      var ctx = canvas.getContext("2d");
      var myNewChart = new Chart(ctx, {
        type: 'pie',
        data: data
      });

      canvas.onclick = function(evt) {
        var activePoints = myNewChart.getElementsAtEvent(evt);
        if (activePoints[0]) {
          var chartData = activePoints[0]['_chart'].config.data;
          var idx = activePoints[0]['_index'];

          var label = chartData.labels[idx];
          var value = chartData.datasets[0].data[idx];

          var url = label + "&value=" + value;
          console.log(url);
          alert(url);

        }
      };
    },

    fillFirstGraphData() {

      this.datacollection = {
        labels: this.getOrganizedArray(this.getRandomInt()%200),
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: this.getRandomArray(100)
          }
        ]
      }
    }
    ,
    fillData() {
      this.fillFirstGraphData()
    }
    ,
    getRandomInt() {

      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    getRandomArray(size) {
      var i;
      var array = [];
      console.log("size " + size)
      for (i = 0; i < size; i++)
        array[i] = this.getRandomInt();
      console.log(array)
      return array;
    },
    getOrganizedArray(size) {
      var i;
      var array = [];
      for (i = 0; i < size; i++)
        array[i] = i;
      return array;
    }
  }
}
</script>

<style>

.left {
  float: left;
  padding: 60px;
}
#myChartPie{
  height: 450px;
  width: 700px;
}
#myChartLine{
  width: 500px;
}
</style>
