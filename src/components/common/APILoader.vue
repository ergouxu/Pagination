<script type="text/javascript">
import axios from 'axios'

// const API_ENDPOINT = ':8080';
// TODO LOCAL TEST
const API_ENDPOINT = 'http://13.73.16.164:18080';


var apiDoGet = function (url,param,onSuccess,onFail,onFinally) {
  var requestUrl = API_ENDPOINT + url;
  requestUrl = requestUrl + param;
  axios.get(requestUrl)
    .then(function (response) {
      onSuccess(response);
    }).catch(function (error) {
      onFail();
    }).then(function () {
      onFinally();
    });
}

var apiDoPost = function (url,param,onSuccess,onFail,onFinally) {
  var requestUrl = API_ENDPOINT + url;
  axios.post(requestUrl, param, { headers:{'Content-Type':'application/json', 'charset':'UTF-8'} })
    .then(function (response) {
      onSuccess(response);
    }).catch(function (error) {
      onFail();
    }).then(function () {
      onFinally();
    });
}

export default
{
  apiDoGet,
  apiDoPost
}

</script>