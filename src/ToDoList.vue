<!--模板-->
<template>
  <div id="ToDo">
    <div>
      <input v-model="inputValue">
      <button @click="handleSubmit">提交</button>
    </div>
    <ul>
      <todo-item
        v-for="(item, index) of list"
        :key="index"
        :content="item"
        :index="index"
        @delete="handleDelete"
      ></todo-item>
    </ul>
    <div>
      <span>完整功能</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import ToDoItem from "./components/ToDoItem";

export default {
  name: "ToDo",
  // 注册一个局部组件，并起一个叫做todo-item的名字
  components: {
    "todo-item": ToDoItem
  },
  // data变为一个函数，返回值为数据
  // 原型：data:function(){
  data() {
    return {
      inputValue: "",
      list: [],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 1
    };
  },
  methods: {
    handleSubmit() {
      //this.list实际上就是this.$data.list的缩写
      this.list.push(this.inputValue);
      this.inputValue = "";
    },
    handleDelete(index) {
      this.list.splice(index, 1);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
