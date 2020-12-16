<template>
  <div>
    <li>
      <ul class="task" v-bind:class="{ bgColor: task.status == 3, color: task.status == 3}">
        <li> {{ task.name }} </li>
        <li> {{ task.deadLine }} </li>
        <li> {{ task.created_at }} </li>
        <li> {{ task.completed_at }} </li>
        <button @click="changeStatus(task)" v-show="task.status < 3">{{ status[task.status] }}</button>
        <button @click="deleteTask(task)">削除</button>
      </ul>
    </li>
  </div>
</template>

<script>

export default {
  name: 'Task',

  props: {
    status: Array,
    task: Object,
  },
  methods: {
    deleteTask(task) {
      this.$emit("delete-click", task);
    },
    changeStatus(task) {
      this.$emit("change-click", task);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
<style scoped>
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
