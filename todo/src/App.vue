<template>
  <div id="app">
    <Todo />
  </div>
</template>

<script>
import Todo from './components/Todo.vue'

export default {
  name: 'App',
  components: {
      Todo
  },
  
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

ul {
    list-style-type: none;
}

.task {
    display: flex;
    width: 80%;
    margin: auto;
    justify-content: space-between;
}

li {
    justify-content: space-between;
}

.bgColor {
  background-color: #dcdcdc;
}

.color {
  color: #fff;
}
</style>
