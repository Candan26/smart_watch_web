<template>
  <div class="graph-container">
    <div class="left">
      <h2 id="myLineChartH2">Line chart 1</h2>
      <line-chart id="myChartLine"></line-chart>
    </div>
    <div class="left">
      <canvas id="myChartPie"></canvas>
    </div>
    <div class="left">
      <vue-options id="myOptions"></vue-options>
    </div>
  </div>
</template>

<script>
import VueOptions from "@/components/VueOptions";
import LineChart from '@/components/LineChart';
import VueTable from "@/components/VueTable";

import Chart from 'chart.js'
import {getRawDataFromDataBase} from '../js/dao';

const urlSkin = `http://127.0.0.1:7547/api/skin`;
const urlEnvironment = `http://127.0.0.1:7547/api/environment?page=1`;
const urlHeartRate = `http://127.0.0.1:7547/api/heart`;
//let that
let pieMap = new Map();
let parsedData
let data = {
  datasets: [{
    data: [72, 72, 72, 72, 72],
    backgroundColor: [
      "#FF0000",
      "#0000FF",
      "#2E8B57",
      "#DAA520",
      "#8B008B"
    ]
  }],
  labels: [
    "HEART RATE",
    "SKIN RESISTANCE",
    "LUMINANCE",
    "TEMPERATURE",
    "MOISTURE"
  ]
}

export default {
  components: {
    LineChart: LineChart,
    VueOptions,
  },
  data() {
    return {}
  },
  mounted() {
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

      canvas.onclick = function (evt) {
        var activePoints = myNewChart.getElementsAtEvent(evt);
        if (activePoints[0]) {
          var chartData = activePoints[0]['_chart'].config.data;
          var idx = activePoints[0]['_index'];
          var label = chartData.labels[idx];
          var value = chartData.datasets[0].data[idx];
          var url = label + "&value=" + value;

          console.log(url);
          let labelLineChart = document.getElementById("myLineChartH2");
          labelLineChart.textContent = label + " DATA"
          pieMap.set(0, urlHeartRate)
          pieMap.set(1, urlSkin)
          pieMap.set(2, urlEnvironment)
          getRawDataFromDataBase(pieMap.get(idx)).then((res) => {
            parsedData = res[0]
            let dataBaseObj = res[1]
            console.log("parsedData  : " + parsedData)
            window.dataChar = parsedData;
            VueTable.methods.updateTable(dataBaseObj)
            fillDataLineChart(parsedData);
          });
        }
      };
    },
  }
}

function fillDataLineChart(dataChar) {
  window.events.emit('updateChar', {dataChar, year: 2010, mounth: 3});
}

</script>

<style>

.left {
  float: left;
  padding: 60px;
}

#myChartPie {
  height: 350px;
  width: 550px;
}

#myChartLine {
  width: 700px;
}

</style>
