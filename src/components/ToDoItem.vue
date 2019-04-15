<template>
  <div class="hello">
    <li class="item" @click="handleDeleted">{{content}}</li>
  </div>
</template>

<script>
export default {
  name: "ToDoItem",
  props: ['content', 'index'],
  methods:{
    handleDeleted(){
      this.$emit('delete', this.index)
    }
  }
  
}
</script>

<!--scoped为作用域，表示只对当前组件起作用 -->
<style scoped>

  .item{
    color: green;
  }

</style>


