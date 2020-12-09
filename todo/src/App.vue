<template>
<div id="app">
    <input type="text" v-model="inputTask.name">
    <input type="datetime-local" name="dead-line" min="2018-06-07T00:00" max="2100-06-14T00:00" v-model="inputTask.deadLine">
    <button @click="addTask()">追加</button>
    <ul>
        <ul class="task" v-for="task in list" :key="task.id">
            <li> {{ task.name }} </li>
            <li> {{ task.deadLine }} </li>
            <li> {{ task.created_at }} </li>
            <li> {{ task.completed_at }} </li>
            <li> {{ task.status }} </li>
        </ul>
    </ul>
</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

const dateformat = require('dateformat');

export default {
  name: 'App',
  components: {
      // HelloWorld
  },

  data() {
    return {
      options: [
        {
          value: 0,
          label: '未着手'
        },
        {
          value: 1,
          label: '作業中'
        },
        {
          value: 2,
          label: '完了'
        }
      ],
      list: [],
      inputTask: {
        name: '',
        deadLine: '',
      }
    }
  },
    methods: {
      addTask() {
        // 現在時刻取得
        const now = new Date();
        // id取得
        let max_id = Math.max.apply(null, this.list.map(function (o) {
            return o.id;
        }))
        const new_id = ++max_id;
        const new_todo = {
            id: new_id,
            name: this.inputTask.name,
            status: 0,
            deadLine: dateformat(this.inputTask.deadLine, 'yyyy年mm月dd日 HH:MM'),
            created_at: dateformat(now, 'yyyy年mm月dd日 HH:MM'),
            completed_at: '----年--月--日 --:--'
        };
        console.log(new_todo);
        this.list.push(new_todo);
      }
    },
    watch: {

    }
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
</style>
