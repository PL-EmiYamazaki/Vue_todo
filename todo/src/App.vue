<template>
  <div id="app">
    <input type="text" v-model="inputTask.name">
    <input type="datetime-local" name="dead-line" min="2018-06-07T00:00" max="2100-06-14T00:00" v-model="inputTask.deadLine">
    <button @click="addTask()" :disabled="addButtonState()">追加</button>
    <ul>
      <ul class="task" v-for="task in list" :key="task.id" v-bind:class="{ bgColor: task.status == 3, color: task.status == 3}">
        <li> {{ task.name }} </li>
        <li> {{ task.deadLine }} </li>
        <li> {{ task.created_at }} </li>
        <li> {{ task.completed_at }} </li>
        <button @click="changeStatus(task.id)" v-show="task.status < 3">{{ status[task.status] }}</button>
        <button @click="deleteTask(task.id)">削除</button>
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
      status: ['未着手', '作業中', '完了', ''],
      list: [],
      inputTask: {
        name: '',
        deadLine: null,
      },
      addButtonState(){
        if(this.inputTask.name) {
          return false;
        } else {
          return true;
        }
      }
    }
  },
    methods: {
      getNewId(array){
        if (!array.length) {
          return 1;
        } else {
          let max_id = Math.max.apply(null, array.map(function (o) {
            return o.id;
          }))
          return ++max_id;
        }
      },
      getDeadLine(now){
        const deadLine = dateformat(this.inputTask.deadLine, 'yyyy年mm月dd日 HH:MM');
        if(now === deadLine){
          return '------------';
        } else {
          return deadLine;
        }
      },
      addTask() {
        // 現在時刻取得
        const now = dateformat(new Date(), 'yyyy年mm月dd日 HH:MM');
        const newTodo = {
            id: this.getNewId(this.list),
            name: this.inputTask.name,
            status: 0,
            deadLine: this.getDeadLine(now),
            created_at: now,
            completed_at: '----年--月--日 --:--'
        };
        this.list.push(newTodo);
        this.inputTask.name = '';
        this.inputTask.deadLine = null;
      },
      deleteTask(targetId) {
        let list = this.list;
        list.some(function(v, i){
          if (v.id==targetId) list.splice(i,1);
        });
      },
      changeStatus(targetId) {
        let list = this.list;
        list.some(function(v){
          if (v.id==targetId){
            ++v.status;
            if (v.status == 3) {
              v.completed_at = dateformat(new Date(), 'yyyy年mm月dd日 HH:MM');
            }
          }
        });
      }
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

.bgColor {
  background-color: #dcdcdc;
}

.color {
  color: #fff;
}
</style>
