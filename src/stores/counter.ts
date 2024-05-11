import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { todoStructure } from '@/type'

export const useTodoStore = defineStore('useTodo', () => {
  const todoList = ref<todoStructure[]>([])
  const setTodoList = (list: todoStructure[]) => {
    todoList.value = [...list] // Spread operator to create a new reactive array
    console.log(todoList.value, 'SS')
  }
  const addTodo = (obj: todoStructure) => {
    todoList.value.push({
      id: (Math.round(Math.random() * (99 - 1 + 1)) + 1).toString(),
      content: obj.content,
      done: obj.done
    })
  }
  const checkTodo = (id: number) => {
    const index = todoList.value.findIndex((index) => parseInt(index.id) === id)
    todoList.value[index].done = !todoList.value[index].done
  }
  const deleteTodo = (id: number) => {
    const index = todoList.value.findIndex((todo) => parseInt(todo.id) === id)
    if (index !== -1) {
      todoList.value.splice(index, 1) // Remove element at specific index
    }
  }

  return { addTodo, todoList, deleteTodo, checkTodo, setTodoList }
})
