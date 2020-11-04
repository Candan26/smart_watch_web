<template>
  <div>
    <div :key="renderCount">
      <wj-flex-chart
        tooltipContent=""
        :itemsSource="data"
        chartType="Line"
        bindingX="date"
        plotMargin="NaN NaN NaN 80"
        :initialized="initializeChart"
      >
        <wj-flex-chart-axis
          wjProperty="axisX"
          :axisLine="false"
        ></wj-flex-chart-axis>
        <wj-flex-chart-series name="Data" binding="yval"></wj-flex-chart-series>
      </wj-flex-chart>
    </div>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";

import "@grapecity/wijmo.vue2.core";
import "@grapecity/wijmo.vue2.chart";
import {  getDataTest } from "../js/data";
import { AxisScrollbar } from "../js/AxisScrollbar";

//let that
//let flex
//let dataChar=[]
export default {
  data: function () {
    return {
      dataChar: [],
      renderCount: 0,
      data: [],
    };
  },
  async mounted() {
    //that = this
    window.events.on("updateChar", ({ dataChar, year, mounth }) => {
      this.data =  getDataTest(dataChar, year, mounth);
      this.renderCount++;
    });
    window.events.on("refresh", () => {
      console.log("refresh pressed");
    });

  },
  methods: {
    initializeChart: function (flex) {
      new AxisScrollbar(flex.axisX, {
        minScale: 0.02,
      });

      new AxisScrollbar(flex.axisY, {
        buttonsVisible: false,
        minScale: 0.05,
      });
    },
  },
};
</script>

<style>
body {
  margin-bottom: 44px;
}

label {
  margin-right: 3px;
}
wj-flexchart {
  margin: 10px;
  padding: 10px;
  border-bottom: 0px;
  touch-action: none;
  -ms-touch-action: none;
  padding-bottom: 40px;
}

/****  Axis Scrollbar Css *****/
.wj-flexchart .wj-axis-scrollbar-container {
  position: relative;
}

.wj-flexchart .wj-axis-scrollbar-container .wj-chart-rangeslider {
  border: 1px solid #eaeaea;
  background-color: #eaeaea;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.wj-flexchart .wj-axis-scrollbar-container .wj-chart-hrangeslider {
  height: 20px;
}

.wj-flexchart .wj-axis-scrollbar-container .wj-chart-vrangeslider {
  width: 20px;
}
</style>
