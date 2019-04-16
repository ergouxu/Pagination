<template>
  <div class="Main">
       <div class="title" >
           <span class="tetleText">天気情報</span>
       </div>
       <div class="weatherInfo">
           <div class="inputArea">
               <span>天気情報検索：</span>
               <input type="date" v-model="fromDate" placeholder="2019/03/01">
               <span>～</span>
               <input type="date" v-model="toDate" placeholder="2019/03/31">
               <button @click="apiTest">検索</button>
           </div>

           <WeatherTable :weatherInfoList="weatherInfoList"></WeatherTable>
            
       </div>
  </div>
</template>

<script>
import LineChart from '@/components/chart/LineChart.vue'
import APILoader from '@/components/common/APILoader.vue'
import apiWeatherMoment from '@/components/api/Weather01_moments.vue'
import WeatherTable from '@/components/weather/WeatherTable.vue'

export default {
  name: 'home',
  components: {
    LineChart,
    APILoader,
    apiWeatherMoment,
    WeatherTable
  },
  activated: function(){
  },
  watch: {
  },
  mounted() {
  },
  data () {
    return {
      apiMomentParam:apiWeatherMoment,
      weatherInfoList:[],
      fromDate:'',
      toDate:''
    }
  },
  methods:{
    apiTest:function(){
      if(this.fromDate == '' && this.toDate == ''){
        return
      }
      this.apiMomentParam.init();
      this.apiMomentParam.param.fromDate = this.fromDate
      this.apiMomentParam.param.toDate = this.toDate
      
      this.APILoader.apiDoGet(this.apiMomentParam.URL,this.apiMomentParam.getParamStr(),
        this.doApiSuccess,this.doApiFail,this.doApiFinally)
    },
    doApiSuccess:function(response){
      this.weatherInfoList = []
      for(var i = 0;i< response.data.length;i++){
        var weatherInfo = {
          unixtime:this.transMilSecToDate(response.data[i].unixtime),
          summary:response.data[i].moment.summary,
          icon:response.data[i].moment.icon,
          precip_type:response.data[i].moment.precip_type,
          temperature:response.data[i].moment.temperature,
          apparent_temperature:response.data[i].moment.apparent_temperature,
          dew_point:response.data[i].moment.dew_point,
          humidity:response.data[i].moment.humidity,
          wind_speed:response.data[i].moment.wind_speed,
          wind_bearing:response.data[i].moment.wind_bearing,
          cloud_cover:response.data[i].moment.cloud_cover,
          uv_index:response.data[i].moment.uv_index,
          visibility:response.data[i].moment.visibility
        }
        this.weatherInfoList.push(weatherInfo)
      }
    },

    doApiFail:function(){
      //TODO 仮データTEST
      var data = [{"unixtime": 1553558400000, "moment": {"time":1553558400000,"summary":"Mostly Cloudy","icon":"partly-cloudy-day","precip_type":"rain","temperature":51.7,"apparent_temperature":51.7,"dew_point":38.77,"humidity":0.61,"wind_speed":4.59,"wind_bearing":23,"cloud_cover":0.75,"uv_index":3,"visibility":7.42}},
      {"unixtime": 1553554800000, "moment": {"time":1553554800000,"summary":"Mostly Cloudy","icon":"partly-cloudy-day","precip_type":"rain","temperature":53.16,"apparent_temperature":53.16,"dew_point":39.05,"humidity":0.59,"wind_speed":4.12,"wind_bearing":17,"cloud_cover":0.75,"uv_index":1,"visibility":9.67}},{"unixtime": 1553551200000, "moment": {"time":1553551200000,"summary":"Mostly Cloudy","icon":"partly-cloudy-day","precip_type":"rain","temperature":53.09,"apparent_temperature":53.09,"dew_point":40.77,"humidity":0.63,"wind_speed":6.93,"wind_bearing":12,"cloud_cover":0.75,"uv_index":0,"visibility":9.7}},{"unixtime": 1553547600000, "moment": {"time":1553547600000,"summary":"Overcast","icon":"cloudy","precip_type":null,"temperature":54.53,"apparent_temperature":54.53,"dew_point":42.35,"humidity":0.63,"wind_speed":4.34,"wind_bearing":8,"cloud_cover":1,"uv_index":0,"visibility":7.1}}]
      var response = {'data':data};
      this.doApiSuccess(response);
    },
    doApiFinally:function(){

    },
    transMilSecToDate:function(milSec){
      var date = new Date(milSec);
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()

      var result =  "" + year + "/" 
                 + ( month < 10 ? "0" + month : month ) + "/"
                 + ( day < 10 ? "0" + day : day ) + " "
                 + ( hour < 10 ? "0" + hour : hour ) + ":"
                 + ( minute < 10 ? "0" + minute : minute ) + ":"
                 + ( second < 10 ? "0" + second : second )
      return result;
    }
  },
}
</script>
<style scoped>
.title {
  width: 100%;
  height: 60px;
  border-bottom: solid 2px gray;
  background-color: rgb(0, 153, 255);
  z-index: 5;
  position: fixed;
  top:0px;
  left:0px;
  text-align: center;
}

.title .tetleText {
  height: 50px;
  font-size: 36px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 60px;
  letter-spacing: normal;
  text-align: center;
  color: black;
}

.weatherInfo{
  min-width: 1366px;
  width:100%;
  margin:0;
  padding-top:62px;
}


</style>
