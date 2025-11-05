<script setup>
  import { useTodoStore } from '~/store/todo'

  const todoStore = useTodoStore()
  const { lists } = storeToRefs(todoStore)

  const route = useRoute()

  const idInUrl = computed(() => route?.query?.id)
  const currentListInStore = computed(() => lists.value?.[idInUrl.value] || null)

  const isConfirmCancelOpened = ref(false)
  const isConfirmRemoveOpened = ref(false)
  const isConfirmResetFormOpened = ref(false)
  const isSavedMessageVisible = ref(false)

  const isSaveBtnDisabled = computed(() => !form.title.trim() || isSavedMessageVisible.value)

  const form = reactive({
    title: '',
    items: []
  })

  const initFormData = () => {
    const list = JSON.parse(JSON.stringify(currentListInStore.value || {}))
    form.title = list.title || ''
    form.items = list.items || []
  }
  initFormData()

  const saveList = () => {
    form.title = form.title.trim()
    form.items = form.items.reduce((acc,item) => {
      const trimedStr = item.text.trim()
      if (trimedStr) {
        acc.push({
          id: item.id,
          text: trimedStr,
          checked: item.checked
        })
      }

      return acc
    }, [])

    todoStore.saveList({
      id: idInUrl.value || generateId(),
      title: form.title,
      items: form.items
    })
    isSavedMessageVisible.value = true
    setTimeout(() => isSavedMessageVisible.value = false, 5000)
  }

  const removeList = () => {
    if (!idInUrl.value) {
      return
    }
    todoStore.removeList(idInUrl.value)
    isConfirmRemoveOpened.value = false
    navigateTo('/')
  }

  const addNewTask = () => {
    form.items.push({
      id: generateId(),
      text: '',
      checked: false
    })
    saveHistorySnapshot()
  }

  const onChangeItem = changedItem => {
    const index = form.items.findIndex(item => item.id === changedItem.id)
    if (index !== -1) {
      form.items[index] = changedItem
    }
    saveHistorySnapshot()
  }

  const removeItem = itemForRemove => {
    const index = form.items.findIndex(item => item.id === itemForRemove.id)

    if (index !== -1) {
      form.items.splice(index, 1)
    }
    saveHistorySnapshot()
  }

  const history = ref([])
  const currentSnapshotIndex = ref(-1)

  const saveHistorySnapshot = () => {
    const newSnapshot = JSON.parse(JSON.stringify(form))
    const lastSnapshot = history.value[currentSnapshotIndex.value]

    // Если новый снимок идентичен последнему — НЕ сохраняем
    if (lastSnapshot && deepEqual(lastSnapshot, newSnapshot)) {
      return
    }

    // Обрезаем историю вперёд (на случай, если были откаты)
    history.value = history.value.slice(0, currentSnapshotIndex.value + 1)
    history.value.push(newSnapshot)
    currentSnapshotIndex.value = history.value.length - 1
  }
  saveHistorySnapshot()

  const applySnapshot = index => {
    currentSnapshotIndex.value = index
    const snapshot = history.value[currentSnapshotIndex.value]

    form.title = snapshot.title
    form.items = snapshot.items.map(item => ({ ...item }))
  }

  const resetForm = () => {
    initFormData()
    history.value = []
    saveHistorySnapshot()
    isConfirmResetFormOpened.value = false
  }
</script>

<template>
  <UiCard class="todo__container">
    <ListHistoryBtns
      :history="history"
      :current-snapshot-index="currentSnapshotIndex"
      class="todo__history"
      @applySnapshot="applySnapshot"
      @clickOnClearHistory="isConfirmResetFormOpened = true"
    />
     <div>
  </div>

    <UiInput
      v-model="form.title"
      placeholder="Название"
      required
      class="todo__title"
      @blur="saveHistorySnapshot"
    />

    <TaskItem
      v-for="item in form.items"
      :key="item.id"
      :task=item
      class=""
      @change="onChangeItem"
      @clickOnRemove="removeItem"
    />

    <div class="todo__add" @click="addNewTask">
      <nuxt-icon name="add" class="todo__add-icon" />
      <div>Добавить задачу</div>
    </div>

    <div class="todo__footer-btns">
      <UiButton
        label="Сохранить"
        :disabled="isSaveBtnDisabled"
        :class="[
          'todo__footer-btn',
          'todo__save-btn',
          {'todo__save-btn_saved': isSavedMessageVisible}
        ]"
        @click="saveList"
      />

      <UiButton
        v-if="currentListInStore?.id"
        label="Удалить"
        type="secondary"
        class="todo__footer-btn"
        @click="isConfirmRemoveOpened = true"
      />

      <div class="todo__link" @click="isConfirmCancelOpened = true">Вернуться к списку</div>
    </div>

    <ListConfirmCancel v-model="isConfirmCancelOpened" @confirm="navigateTo('/')" />
    <ListConfirmRemove v-model="isConfirmRemoveOpened" @confirm="removeList" />
    <ListConfirmResetForm v-model="isConfirmResetFormOpened" @confirm="resetForm" />
  </UiCard>
</template>

<style lang="scss" scoped>
.todo {
  &__container {
    padding: 24px;
    width: 100%;
    max-width: 600px;
    margin: auto;
  }

  &__history {
    margin-bottom: 16px;
  }

  &__title {
    width: 100%;
    margin-bottom: 16px;
  }

  &__add {
    margin-top: 16px;
    display: flex;
    align-items: center;
    width: max-content;
    color: $grey-500;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.2;

    &_disabled {
      cursor: default;
      color: $grey-300;
    }

    &:not(&_disabled):hover {
      color: $primary-color;
    }

    * {
      transition: $transition;
    }
  }

  &__add-icon {
    margin-right: 6px;

    &, :deep(svg) {
      width: 16px;
      height: 16px;
    }
  }

  &__footer-btns {
    display: flex;
    align-items: center;
    margin-top: 16px;
  }

  &__footer-btn {
    margin-right: 8px;
  }

  &__save-btn {
    position: relative;

    &_saved:after {
      position: absolute;
      top: -2px;
      bottom: -2px;
      left: -2px;
      right: -2px;
      content: 'Сохранено';
      color: #fff;
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.1;
      background: #8CDFB3FF;
      padding-top: 8px;
      border-radius: 6px;
    }
  }

  &__link {
    width: max-content;
    color: $grey-500;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.2;
    cursor: pointer;
    margin-left: auto;

    &:hover {
      color: $primary-color;
    }
  }
}
</style>
