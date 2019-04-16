<template>
  <div class="tableArea">
    <table class="weatherTable" style="width:100%">
      <thead>
        <tr>
          <th style="width:14%">時間</th>
          <th style="width:10%">概要</th>
          <th style="width:10%">アイコン</th>
          <th style="width:6%">降雨</th>
          <th style="width:6%">温度</th>
          <th style="width:8%">体感温度</th>
          <th style="width:8%">露点温度</th>
          <th style="width:6%">湿度</th>
          <th style="width:6%">風速</th>
          <th style="width:6%">風向</th>
          <th style="width:6%">雲量</th>
          <th style="width:8%">紫外線指数</th>
          <th style="width:6%">視程</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(weatherInfo,index) in weatherInfoList" :key="index">
          <td>{{weatherInfo.unixtime}}</td>
          <td>{{weatherInfo.summary}}</td>
          <td>{{weatherInfo.icon}}</td>
          <td>{{weatherInfo.precip_type}}</td>
          <td>{{weatherInfo.temperature}}</td>
          <td>{{weatherInfo.apparent_temperature}}</td>
          <td>{{weatherInfo.dew_point}}</td>
          <td>{{weatherInfo.humidity}}</td>
          <td>{{weatherInfo.wind_speed}}</td>
          <td>{{weatherInfo.wind_bearing}}</td>
          <td>{{weatherInfo.cloud_cover}}</td>
          <td>{{weatherInfo.uv_index}}</td>
          <td>{{weatherInfo.visibility}}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import HighCharts from "highcharts";

export default {
  name: "weatherTable",
  props: {
    weatherInfoList: Array
  },
  activated: function() {},
  watch: {
    option() {}
  },
  mounted() {},
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 2px;
  border-color: #a9c6c9;
  text-align: center;
}
el-pagination {
  text-align: right;
}
.tableArea .weatherTable {
  /* font-family: verdana,arial,sans-serif; */
  font-size: 14px;
  color: #333333;
  border-width: 1px;
  border-collapse: collapse;
}
.tableArea .weatherTable th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #a9c6c9;
  background-color: #eef1f6;
}
.tableArea .weatherTable td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #a9c6c9;
  background-color: white;
}
</style>
