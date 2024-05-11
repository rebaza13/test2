<template>
  <div class="main">
    <div class="title has-text-centered">Rebaz Todo</div>

    <form action="" @submit.prevent="addTodos()">
      <div class="field has-addons pl-5">
        <div class="control">
          <input v-model="content" class="input" type="text" placeholder="Add a todo" />
        </div>
        <div class="control">
          <button class="button is-info">Add</button>
        </div>
      </div>
    </form>

    <div v-for="todo in todoList" :key="todo.content" class="card">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column">{{ todo.content }}</div>

            <div class="column has-text-right">
              <button
                @click="checkTodo(parseInt(todo.id))"
                class="button mr-2"
                :class="{ 'has-text-success': todo.done, 'has-text-danger': !todo.done }"
              >
                &check;
              </button>
              <button @click="deleteTodo(parseInt(todo.id))" class="button is-danger">
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { todoStructure } from '@/type'
import { ref, onMounted } from 'vue'
import { useTodoStore } from '@/views'
import { db } from '@/firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'

const { addTodo, todoList, deleteTodo, checkTodo, setTodoList } = useTodoStore()
const content = ref<string>()
// const done = ref<boolean>(false)
const addTodos = () => {
  addTodo({
    id: '1',
    content: content.value!,
    done: false
  })
  content.value = ''
}

let list: todoStructure[] = []
onMounted(async () => {
  try {
    const todoCollection = collection(db, 'todo')

    const querySnapshot = await getDocs(todoCollection)
    querySnapshot.forEach((doc) => {
      const data = doc.data() as todoStructure
      list.push({
        id: doc.id,
        done: data.done,
        content: data.content
      })
    })

    setTodoList(list)
  } catch (e) {
    console.log('error', e)
  }
})
</script>
<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css';
.main {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
</style>
