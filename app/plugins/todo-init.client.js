import { useTodoStore } from '~/store/todo'

export default defineNuxtPlugin(() => {
  const store = useTodoStore()
  store.init()
})
