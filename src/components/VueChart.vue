<template>
  <div class="graph-container">
    <div class="left">
      <h2 id="myLineChartH2">Line chart 1</h2>
      <PieChartTest id="myChartLine"></PieChartTest>
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
import PieChartTest from '@/components/PieChartTest';

import Chart from 'chart.js'
import {getRawDataFromDataBase} from '../js/dao';


const urlSkin = `http://127.0.0.1:7547/api/skin`;
const urlEnvironment = `http://127.0.0.1:7547/api/environment?page=1`;
const urlHeartRate = `http://127.0.0.1:7547/api/heart`;
let that
let pieMap= new Map();
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
};

export default {
  components: {
    PieChartTest,
    VueOptions,
  },
  data() {
    return {}
  },
  mounted() {
    that = this;
    this.createPieChart()
    this.fillData()
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
          that.fillData();
          let labelLineChart = document.getElementById("myLineChartH2");
          //console.log("VueOptions.data().time"+VueOptions.data().range  )
          labelLineChart.textContent = label + " DATA"
          pieMap.set(0,urlHeartRate)
          pieMap.set(1,urlSkin)
          pieMap.set(2,urlEnvironment)

          //getRawDataFromDataBase(pieMap.get(idx)).then(result => console.log("raw data " + result));
          getRawDataFromDataBase(pieMap.get(idx)).then((res) => {
            let parsedData = res[0]
            let dataBaseObj = res[1]
            console.log("dataBaseObj : "+dataBaseObj[0].id)
            console.log("dataBaseObj : "+dataBaseObj[0].type)
            console.log("dataBaseObj : "+dataBaseObj[0].data)
            console.log("dataBaseObj : "+dataBaseObj[0].date)
            console.log("dataBaseObj : "+dataBaseObj[0].person)

            console.log("parsedData  : "+ parsedData)

          });
        }
      };
    },
    fillFirstGraphData() {

      this.datacollection = {
        labels: this.getOrganizedArray(this.getRandomInt() % 200),
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: this.getRandomArray(200)
          }
        ]
      }
    }
    ,
    fillData() {
      PieChartTest.methods.updateChart(this.getRandomInt(), 2010, 3)
    }
    ,
    getRandomInt() {
      return Math.floor(Math.random() * (1000 - 5 + 1)) + 5
    },
    getRandomArray(size) {
      var i;
      var array = [];
      for (i = 0; i < size; i++)
        array[i] = this.getRandomInt();
      //console.log(array)
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

#myChartPie {
  height: 350px;
  width: 550px;
}

#myChartLine {
  width: 700px;
}

</style>
