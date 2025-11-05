<script setup>
  import { useTodoStore } from '~/store/todo'

  const todoStore = useTodoStore()
  const { filteredLists, filters } = storeToRefs(todoStore)

  const isConfirmRemoveOpened = ref(false)
  const idRemovingList = ref(null)

  const removeListItem = () => {
    todoStore.removeList(idRemovingList.value)
    isConfirmRemoveOpened.value = false
  }

  const onRemoveClick = listId => {
    idRemovingList.value = listId
    isConfirmRemoveOpened.value = true
  }

  let stopConfirmRemoveWatcher = null

  onMounted(() => {
    stopConfirmRemoveWatcher = watch(isConfirmRemoveOpened, newVal => {
      if (!newVal) {
        idRemovingList.value = null
      }
    })
  })

  onBeforeUnmount(() => {
    if (typeof stopConfirmRemoveWatcher === 'function') {
      stopConfirmRemoveWatcher()
    }
  })

</script>

<template>
  <UiCard class="list__container">
    <div class="list__head">
      <UiInput
        v-model="filters.search"
        placeholder="Поиск по названию"
        icon="search"
        class="list__search"
      />

      <NuxtLink to="/todo" class="list__head-create-btn">
        <UiButton
          type="primary"
          label="Новая заметка"
          icon="list"
        />
      </NuxtLink>
    </div>

    <ClientOnly>
      <div v-if="filteredLists?.length" class="list__grid">
        <ListItem
          v-for="item in filteredLists"
          :key="item.id"
          :list="item"
          @clickOnRemove="onRemoveClick"
        />
      </div>
      <div v-else class="list__empty-msg">
        <div>Здесь пока ничего нет</div>
        <nuxt-link to="/todo">Создать новую заметку</nuxt-link>
      </div>
    </ClientOnly>

    <ListConfirmRemove
      v-model="isConfirmRemoveOpened"
      @confirm="removeListItem"
    />

    <nuxt-link to="/todo" class="list__fixed-create-btn">
      <nuxt-icon name="plus" class="list__fixed-create-btn-icon" />
    </nuxt-link>
  </UiCard>
</template>

<style lang="scss" scoped>
.list {
  &__container {
    padding: 24px;
    min-height: calc(100vh - $header-height);
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  &__search {
    width: 100%;
    max-width: 300px;
  }

  &__grid {
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr;

    @media screen and (min-width: 500px) {
      grid-template-columns: repeat(2,1fr);
    }

    @media screen and (min-width: 900px) {
      grid-template-columns: repeat(3,1fr);
    }
  }

  &__head-create-btn {
    display: none;

    @media screen and (min-width: 600px) {
      display: block;
    }
  }

  &__fixed-create-btn {
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: $primary-color;

    @media screen and (min-width: 600px) {
      display: none;
    }

    &-icon {
      &, :deep(svg) {
        width: 24px;
        height: 24px;
      }
    }
  }

  &__empty-msg {
    margin-top: 120px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
