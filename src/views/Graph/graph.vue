<template>
<div>
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
               <el-dropdown size="small" @command="handleCommand">
                    <span class="el-dropdown-link">
                      グラフタイプ<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="a">温度</el-dropdown-item>
                      <el-dropdown-item command="b">体感温度</el-dropdown-item>
                      <el-dropdown-item command="c">露点温度</el-dropdown-item>
                      <el-dropdown-item command="d">湿度</el-dropdown-item>
                      <el-dropdown-item command="e">風速</el-dropdown-item>
                      <el-dropdown-item command="f">風向</el-dropdown-item>
                      <el-dropdown-item command="g">雲量</el-dropdown-item>
                      <el-dropdown-item command="h">紫外線指数</el-dropdown-item>
                      <el-dropdown-item command="i">視程</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
  </div>
  <LineChart ref="lineChart"/>
</div>
</template>

<script>
import LineChart from '@/components/chart/LineChart.vue'
import APILoader from '@/components/common/APILoader.vue'
import apiWeatherMoment from '@/components/api/Weather01_moments.vue'

export default {
name: 'home',
components: {
  LineChart,
  APILoader,
  apiWeatherMoment
},
activated: function(){
},
watch: {
},
mounted() {
  this.apiTest();
  this.getInstances();
},
data () {
  return {
    apiMomentParam:apiWeatherMoment,
    xData:[],
    yData:[],
    instancesList:[],
    instanceValue:'',
    yName:'',
    title:'',
    subtitle:'',
    after:'',
    before:'',
    command:'',
    yAxisName:'',
  }
},
methods:{
  handleCommand(command) {
      this.command = command;
      this.apiTest();
   },
  apiTest:function(){
    this.apiMomentParam.init();
    this.apiMomentParam.param.after = this.after
    this.apiMomentParam.param.before = this.before
    this.apiMomentParam.param.instanceName = this.instanceValue

    this.APILoader.apiDoGet(this.apiMomentParam.URL,this.apiMomentParam.getParamStr(),
      this.doApiSuccess,this.doApiFail,this.doApiFinally)
  },
  getInstances:function(){
      this.apiMomentParam.init();
      this.APILoader.apiDoGet(this.apiMomentParam.INSTANCE_URL,this.apiMomentParam.getParamStr(),
      this.doInstanceApiSuccess,this.doApiFail,this.doApiFinally)
    },
  doApiSuccess:function(response){
    this.xData = []
    this.ydata = []
    for(var i=response.data.current_page_moments.length-1;i>=0;i--){
      var weatherInfo = {
        unixtime:response.data.current_page_moments[i].unixtime,
        summary:response.data.current_page_moments[i].moment.summary,
        icon:response.data.current_page_moments[i].moment.icon,
        precip_type:response.data.current_page_moments[i].moment.precip_type,
        temperature:response.data.current_page_moments[i].moment.temperature,
        apparent_temperature:response.data.current_page_moments[i].moment.apparent_temperature,
        dew_point:response.data.current_page_moments[i].moment.dew_point,
        humidity:response.data.current_page_moments[i].moment.humidity,
        wind_speed:response.data.current_page_moments[i].moment.wind_speed,
        wind_bearing:response.data.current_page_moments[i].moment.wind_bearing,
        cloud_cover:response.data.current_page_moments[i].moment.cloud_cover,
        uv_index:response.data.current_page_moments[i].moment.uv_index,
        visibility:response.data.current_page_moments[i].moment.visibility
      }
      // this.xData.push(this.transMilSecToDate(parseInt(weatherInfo.unixtime)))
      // this.xData.push(this.transMilSecToDate(weatherInfo.unixtime))
      this.xData.push(weatherInfo.unixtime)
      if(this.command=='' || this.command=='a'){
         this.ydata.push(parseFloat(weatherInfo.temperature))  
      }else if(this.command=='b'){
          this.ydata.push(parseFloat(weatherInfo.apparent_temperature))
      }else if(this.command=='c'){
          this.ydata.push(parseFloat(weatherInfo.dew_point))
      }else if(this.command=='d'){
          this.ydata.push(parseFloat(weatherInfo.humidity))
      }else if(this.command=='e'){
          this.ydata.push(parseFloat(weatherInfo.wind_speed))
      }else if(this.command=='f'){
          this.ydata.push(parseFloat(weatherInfo.wind_bearing))
      }else if(this.command=='g'){
          this.ydata.push(parseFloat(weatherInfo.cloud_cover))
      }else if(this.command=='h'){
          this.ydata.push(parseFloat(weatherInfo.uv_index))
      }else if(this.command=='i'){
          this.ydata.push(parseFloat(weatherInfo.visibility))
      }
    }
    if(this.command=='' || this.command=='a'){
        this.title = '温度線グラフ'
        this.yName = '温度'
        this.yAxisName = '温度数'
      }else if(this.command=='b'){
        this.title = '体感温度線グラフ'
        this.yName = '体感温度'
        this.yAxisName = '体感温度数'
      }else if(this.command=='c'){
        this.title = '露点温度線グラフ' 
        this.yName = '露点温度'
        this.yAxisName = '露点温度数'
      }else if(this.command=='d'){
        this.title = '湿度線グラフ' 
        this.yName = '湿度'
        this.yAxisName = '湿度数'
      }else if(this.command=='e'){
        this.title = '風速線グラフ'
        this.yName = '風速' 
        this.yAxisName = '風速数'
      }else if(this.command=='f'){
        this.title = '風向線グラフ'
        this.yName = '風向'
        this.yAxisName = '風向数'
      }else if(this.command=='g'){
        this.title = '雲量線グラフ' 
        this.yName = '雲量'
        this.yAxisName = '雲量数'
      }else if(this.command=='h'){
        this.title = '紫外線指数線グラフ'
        this.yName = '紫外線指数' 
        this.yAxisName = '紫外線指数' 
      }else if(this.command=='i'){
        this.title = '視程線グラフ' 
        this.yName = '視程'
        this.yAxisName = '視程数'
      }
    this.subtitle = 'デモ(line)';
    this.$refs.lineChart.makeChartData(this.xData,this.ydata,this.yName,this.title,this.subtitle,this.yAxisName);
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
}
}
</script>
<style>
.btn{
  padding: 10px;
  width: 80px;
  height: 40px;
  background: #f1f5bb;
  border-radius: 5px;
  margin-left: 10px;
   border: 1px solid #CCCCCC;
}
.btn{
   padding: 10px;
   width: 80px;
   height: 40px;
   background: #f1f5bb;
   border-radius: 5px;
   margin-left: 10px;
    border: 1px solid #CCCCCC;
 }
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

.el-select{
  margin-left: 15px;
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
.el-dropdown-link {
    margin-left: 15px;
    cursor: pointer;
    color: #409EFF;
  }
.el-icon-arrow-down {
    font-size: 12px;
  }
</style>