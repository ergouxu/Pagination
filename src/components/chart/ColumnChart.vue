<template>
<div>
  <div class="x-bar">
    <div id="testColumnChart"  :option="option"></div>
  </div>
</div>
</template>

<script>
import HighCharts from 'highcharts'

export default {
  name: 'columnChart',
  props: {
    title: '',
    subtitle: ''
  },
  activated: function(){

  },
  watch: {
    option () {
      HighCharts.chart('testColumnChart',this.option);
    }
  },
  mounted() {
  },
  data () {
    return {
      option:Object
    }
  },
  methods:{
    makeChartData:function(xData,yData,yName){
      this.option = {
          chart: {
            type: 'column'
          },
          title: {
            text: this.title
          },
          subtitle: {
            text: this.subtitle
          },
          xAxis: {
            categories: xData,
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: 'number'
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span>',
            pointFormat: '<br><span style="color:{series.color};padding:0">{series.name}: </span>' +
            '<span style="padding:0"><b>{point.y}</b></span>',
            footerFormat: '',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              borderWidth: 0
            }
          },
          series: [{
            name: yName,
            data: yData
          }],
          credits: {
            enabled: false
          },
          exporting:{
            enabled:false
          }
        }
    }

  }
}
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
