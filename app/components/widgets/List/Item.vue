<script setup>
  const emit = defineEmits(['clickOnRemove'])

  const props = defineProps({
    list: {
      type: Object,
      required: true
    },

    visibleTasksCount: {
      type: Number,
      default: 3
    }
  })

  const visibleTasks = computed(() => {
    return props.list.items?.slice(0, props.visibleTasksCount) || []
  })

  const counterStr = computed(() => {
    const count = props.list?.items?.length

    if (!count) {
      return '0 задач'
    }

    return `${count} ${getWordByNumber(count, 'задача', 'задачи', 'задач')}`
  })
</script>

<template>
  <UiCard class="list-item">
    <div class="list-item__head">
      <div class="list-item__title-wrap">
        <div class="list-item__title">{{ list.title }}</div>
        <div class="list-item__counter">{{ counterStr }}</div>
      </div>


      <div class="list-item__btns-wrap">
        <nuxt-link :to="`/todo?id=${list.id}`">
          <nuxt-icon name="pen" class="list-item__btn list-item__btn_edit" filled />
        </nuxt-link>
        <nuxt-icon name="trash" class="list-item__btn" filled @click="emit('clickOnRemove', list.id)" />
      </div>
    </div>

    <div
      v-for="task in visibleTasks"
      :key="task.id"
      :class="[
        'list-item__task',
        {'list-item__task_checked': task.checked}
      ]"
    >
      {{ task.text }}
    </div>

  </UiCard>
</template>

<style lang="scss" scoped>
.list-item {
  padding: 16px;
  color: $text-grey-dark;
  min-width: 0;
  min-height: 140px;

  &__head {
    margin-bottom: 16px;
    display: flex;
    align-items: start;
  }

  &__btns-wrap {
    display: flex;
    margin-left: auto;
  }

  &__title-wrap {
    flex: 1;
    max-width: 80%;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.2;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &__task {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.2;
    color: $text-grey-light;
    margin-bottom: 2px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;

    &_checked {
      text-decoration: line-through;
    }
  }

  &__counter {
    font-size: 12px;
    font-weight: 400;
    line-height: 1.1;
    color: $grey-500;
    margin-top: 4px;
  }

  &__btn {
    color: $grey-400;
    transition: $transition;
    cursor: pointer;
    display: inline-block;

    &:hover {
      color: $primary-color;
    }

    &_edit {
      margin-right: 8px;
    }

    &, :deep(svg) {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
