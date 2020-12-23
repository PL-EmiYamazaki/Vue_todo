<template>
  <div>
    <Input
      v-bind:value="inputTask.name"
      v-on:input="inputTask.name = $event"
      type="text"
    />
    <Input
      v-bind:value="inputTask.deadLine"
      v-on:input="inputTask.deadLine = $event"
      type="datetime-local"
    />

    <select v-model="selected">
      <option v-for="option in options" :key="option.status" v-bind:value="option.status">
        {{ option.text }}
      </option>
    </select>

    <button @click="addTask()" :disabled="addButtonState">追加</button>
    <ul>
      <Task 
        v-for="task in list"
        :key="task.id"
        :task="task"
        :status="status"
        @delete-click='deleteTask'
        @change-click='changeStatus'
      />
    </ul>
  </div>
</template>

<script>
import Input from './Input.vue'
import Task from './Task.vue'
const dateformat = require('dateformat');

export default {
  name: 'Todo',
  components: {
    Task,
    Input,
  },
  localStorage: {
    taskKey: {
      type: Array
    }
  },
  watch: {
    inputTask: {
      handler: function () {
        this.addButtonState = this.inputTask.name ? false : true;
      },
      deep: true
    },
    list: {
      handler: function () {
      this.$localStorage.remove('taskKey');
      this.$localStorage.set('taskKey', this.list);
      },
      deep: true
    },
    selected: function () {
      switch (this.selected) {
        case 0:
          this.list.sort(function(a, b) {
            return a.id < b.id ? -1 : 1;
          });
          break;
        case 1:
          this.list.sort(function(a, b) {
            return a.deadLine < b.deadLine ? -1 : 1;
          });
          break;
        case 2:
          this.list.sort(function(a, b) {
            return a.completed_at < b.completed_at ? -1 : 1;
          });
          break;
        case 3:
          this.list.sort(function(a, b) {
            return a.name < b.name ? -1 : 1;
          });
          break;
        default:
          this.list.sort(function(a, b) {
            return a.id < b.id ? -1 : 1;
          });
          break;
      }
    }
  },

  data() {
    return {
      id: 0,
      selected: 0,
      options: [
        { text: '作成日', status: 0 },
        { text: '期日', status: 1 },
        { text: '完了日', status: 2 },
        { text: 'タスク名', status: 3 }
      ],
      status: ['未着手', '作業中', '完了', ''],
      list: [],
      inputTask: {
        name: '',
        deadLine: null,
      },
      addButtonState: true,
    }
  },
  mounted () {
    this.list = this.$localStorage.get('taskKey')
  },
  methods: {
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
      let newId = this.id++;
      const newTodo = {
          id: newId,
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
    deleteTask(task) {
      let list = this.list;
      const index = this.list.indexOf(task)
      list.splice(index, 1)
    },
    changeStatus(task) {
      ++task.status;
      if (task.status == 3) {
        task.completed_at = dateformat(new Date(), 'yyyy年mm月dd日 HH:MM');
      }
    }
  }
}
</script>
