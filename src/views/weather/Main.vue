<template>
  <div class="Main">
       <div class="title" >
           <span class="tetleText">天気情報</span>
       </div>
       <div class="weatherInfo">
           <div class="inputArea">
                <el-date-picker
                  v-model="after"
                  type="datetime"
                  placeholder="日付を選択">
                 </el-date-picker>
                <span>～</span>
                <el-date-picker
                  v-model="before"
                  type="datetime"
                  placeholder="日付を選択">
                 </el-date-picker>
                 <el-select v-model="instanceValue" clearable placeholder="instancesを選択">
                    <el-option
                      v-for="item in instancesList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
               <button class="searchButton" @click="apiTest">検索</button>

                <el-pagination style="display:inline-block;float:right"
                  @size-change="pageNumberChange"
                  @current-change="pageIndexChange"
                  :current-page="pageIndex"
                  :page-sizes="[10, 30, 50]"
                  :page-size="50"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalCount"
                ></el-pagination>
           </div>
           <WeatherTable
              :weatherInfoList="weatherInfoList"
            ></WeatherTable>
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
    this.getInstances();
  },
  data () {
    return {
      apiMomentParam:apiWeatherMoment,
      weatherInfoList:[],
      instancesList:[],
      after:'',
      before:'',
      totalCount: 0,
      total:0,
      defulatPageNumber: 50,
      pageIndex: 1,
      instanceValue:''
    }
  },

  methods:{
    apiTest:function(){
      // if(this.after == '' && this.before == ''){
      //   return
      // }
      this.apiMomentParam.init();
      this.pageIndex = 1;
      this.apiMomentParam.param.after = this.after
      this.apiMomentParam.param.before = this.before
      this.apiMomentParam.param.instanceName = this.instanceValue
      this.apiMomentParam.param.pageNumber = this.defulatPageNumber
      this.apiMomentParam.param.pageIndex = this.pageIndex
      
      this.APILoader.apiDoGet(this.apiMomentParam.URL,this.apiMomentParam.getParamStr(),
        this.doApiSuccess,this.doApiFail,this.doApiFinally)
    },
    getInstances:function(){
      this.apiMomentParam.init();
      this.APILoader.apiDoGet(this.apiMomentParam.INSTANCE_URL,this.apiMomentParam.getParamStr(),
      this.doInstanceApiSuccess,this.doApiFail,this.doApiFinally)
    },
    doApiSuccess:function(response){
      this.weatherInfoList = []
      this.total = parseInt(response.data.total_pages)
      this.totalCount = parseInt(response.data.total_count)
      for(var i = 0;i< response.data.current_page_moments.length;i++){
        var info = response.data.current_page_moments[i]
        var weatherInfo = {
          unixtime:this.transMilSecToDate(info.unixtime),
          summary:info.moment.summary,
          icon:info.moment.icon,
          precip_type:info.moment.precip_type,
          temperature:info.moment.temperature,
          apparent_temperature:info.moment.apparent_temperature,
          dew_point:info.moment.dew_point,
          humidity:info.moment.humidity,
          wind_speed:info.moment.wind_speed,
          wind_bearing:info.moment.wind_bearing,
          cloud_cover:info.moment.cloud_cover,
          uv_index:info.moment.uv_index,
          visibility:info.moment.visibility
        }
        this.weatherInfoList.push(weatherInfo)
      }
    },
    doInstanceApiSuccess:function(response){
      this.instances = []
      for(var i = 0;i < response.data.length;i++){
        var instanceInfo = {
          value:response.data[i].id,
          label:response.data[i].id
        }
        this.instancesList.push(instanceInfo)
      }
    },

    doApiFail:function(){

    },
    doApiFinally:function(){

    },
    transMilSecToDate:function(milSec){
      var date = new Date(parseInt(milSec));
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
    },
    pageIndexChange: function(pageIndex) {
      if(pageIndex == undefined || pageIndex == null || pageIndex < 0){
        pageIndex = 1
      }
      if(pageIndex > this.total){
        pageIndex = this.total
      }
      this.pageIndex = pageIndex;
      // APIのpageIndex変更だけ、他の条件変更しない
      this.apiMomentParam.param.pageIndex = pageIndex;
      this.APILoader.apiDoGet(this.apiMomentParam.URL,this.apiMomentParam.getParamStr(),
        this.doApiSuccess,this.doApiFail,this.doApiFinally)
    },
    pageNumberChange:function(pageNumber) {
      if(pageNumber == undefined || pageNumber == null || pageNumber < 0 || pageNumber > 50){
        pageNumber = 50
      }
      this.defulatPageNumber = pageNumber;
      // APIのpageNumber変更だけ、他の条件変更しない
      this.apiMomentParam.param.pageNumber = pageNumber;
      this.APILoader.apiDoGet(this.apiMomentParam.URL,this.apiMomentParam.getParamStr(),
        this.doApiSuccess,this.doApiFail,this.doApiFinally)
    }

  },
}
</script>
<style scoped>
.main{
  padding: 20px;
}
.title {
  width: 100%;
  height: 30px;
  z-index: 5;
  top:0px;
  left:0px;
  text-align: left;
}

.el-select{
  margin-left: 15px;
}
.title .tetleText {
  height: 30px;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  font-size: 18px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 30px;
  letter-spacing: normal;
  text-align: center;
  color: black;
}

.weatherInfo{
  min-width: 1366px;
  width:100%;
  margin:0;
}
.inputArea{
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  background: #f2f2f2;
  padding: 10px;
  margin: 10px 0;
}

.inputDate{
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #bfcbd9;
  box-sizing: border-box;
  color: #1f2d3d;
  display: block;
  font-size: inherit;
  line-height: 1;
  outline: 0;
  padding: 3px 10px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  display: inline-block
}

.searchButton{
  background: #4db3ff;
  border-color: #4db3ff;
  color: #fff;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #bfcbd9;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  padding: 6px 15px;
  font-size: 14px;
  border-radius: 4px;
  margin-left : 12px
}
</style>
