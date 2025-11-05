import { defineStore } from 'pinia'

const STORAGE_KEY = 'todos-list'

function loadFromStorage() {
  if (typeof window === 'undefined') return {}

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return {}
    }

    const parsed = JSON.parse(raw)

    return parsed
  } catch (e) {
    console.warn(e)
    return {}
  }
}

const saveToStorage = state => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.error(e)
  }
}

export const useTodoStore = defineStore('todo', {
  state: () => ({
    lists: {},
    filters: {
      search: ''
    }
  }),

  getters: {
    filteredLists(state) {
      const lists = Object.values(this.lists)

      return state.filters?.search ? lists.filter(list => list.title.includes(state.filters?.search)) : lists
    },
  },

  actions: {
    init() {
      if (typeof window !== 'undefined') {
        this.lists = loadFromStorage()
      }
    },

    saveList(list) {
      const { id } = list
      if (!id) {
        return
      }

      this.lists[id] = {
        id,
        title: list.title,
        items: list.items
      }

      saveToStorage(this.lists)
    },

    removeList(listId) {
      if (this.lists[listId]) {
        delete this.lists[listId]
        saveToStorage(this.lists)
      }
    },

  }
})
