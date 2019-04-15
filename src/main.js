// 是整个项目的入口文件
import Vue from 'vue'
import ToDoList from './ToDoList.vue'
import Pagination from './components/Pagination.vue'
import './plugins/element.js'

// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false

//创建了一个Vue实例，挂载在app的节点
new Vue({
  // 注册了一个名叫App的局部组件 
  render: h => h(Pagination),
  // render: function (createElement) {
//   return createElement(App);
// } 这是TM时ES6的语法
}).$mount('#app')
// 将 h 作为 createElement 的别名是 Vue 生态系统中的一个通用惯例，实际上也是 JSX 所要求的，
// mount的作用时如果在作用域中 h 失去作用，在应用中会触发报错。

