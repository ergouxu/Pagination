<template>
  <div>
    <div class="x-bar">
      <div id="testLineChart" :option="option"></div>
    </div>
  </div>
</template>

<script>
import HighCharts from "highcharts";

export default {
  name: "lineChart",
  props: {},
  activated: function() {},
  watch: {
    option() {
      HighCharts.chart("testLineChart", this.option);
    }
  },
  mounted() {
    // this.initChart();
  },
  data() {
    return {
      option: Object
    };
  },
  methods: {
    makeChartData: function(xData, yData, yName, title, subtitle, yAxisName) {
      this.option = {
        chart: {
          type: "line"
        },
        title: {
          text: title
        },
        subtitle: {
          text: subtitle
        },
        xAxis: {
          labels: {
            enabled: true //是否显示X坐标轴
          },
          categories: xData,
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: yAxisName
          },
          allowDecimals: false
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span>',
          pointFormat:
            '<br><span style="color:{series.color};padding:0">{series.name}: </span>' +
            '<span style="padding:0"><b>{point.y}</b></span>',
          footerFormat: "",
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            borderWidth: 0
          }
        },
        series: [
          {
            name: yName,
            data: yData
          }
        ],
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        }
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
