<script type="text/javascript">

const URL = '/api/getMoments'

const INSTANCE_URL = '/api/getInstances'

var param = {
  className : null,
  instanceName : null,
  after:null,
  before:null,
  pageNumber : null,
  pageIndex : null
}
var init = function(){
  param.className = null
  param.instanceName = null
  param.after = null
  param.before = null
  param.pageNumber = null
  param.pageIndex = null
}
var transDateToMilSec = function(date){
  if(date == null || date == undefined || date == ''){
    return null
  }     

  return new Date(date).getTime(); 
}

var getParamStr = function(){
  return "?"
  + (param.className != null ? ("className=" + param.className + "&"):"" )
  + (param.instanceName != null ? ("instanceName=" + param.instanceName + "&"):"" )
  + ((transDateToMilSec(param.after) != null ? ("after=" + transDateToMilSec(param.after) + "&"):"" ))
  + ((transDateToMilSec(param.before) != null ? ("before=" + transDateToMilSec(param.before) + "&"):"" ))
  + (param.pageNumber != null ? ("pageNumber=" + param.pageNumber + "&"):"" )
  + (param.pageIndex != null ? ("pageIndex=" + param.pageIndex):"" )
}

export default
{
  URL,
  INSTANCE_URL,
  init,
  param,
  getParamStr
}

</script>