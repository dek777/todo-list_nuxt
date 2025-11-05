<script setup>
  const emit = defineEmits(['applySnapshot', 'clickOnClearHistory'])

  const props = defineProps({
    history: {
      type: Array,
      default: () => []
    },

    currentSnapshotIndex: {
      type: Number,
      default: 0
    }
  })

  const isUndoBtnEnabled = computed(() => props.currentSnapshotIndex > 0)
  const isRedoBtnEnabled = computed(() => props.currentSnapshotIndex < props.history.length - 1)

  const undo = () => {
    if (isUndoBtnEnabled.value) {
      emit('applySnapshot', props.currentSnapshotIndex - 1)
    }
  }

  const redo = () => {
    if (isRedoBtnEnabled.value) {
      emit('applySnapshot', props.currentSnapshotIndex + 1)
    }
  }

</script>

<template>
  <div class="history">
    <nuxt-icon
      name="undo"
      :class="['history__btn', {'history__btn_disabled': !isUndoBtnEnabled}]"
      filled
      @click="undo"
    />
    <nuxt-icon
      name="redo"
      :class="['history__btn', {'history__btn_disabled': !isRedoBtnEnabled}]"
      filled
      @click="redo"
    />

    <div v-if="history.length > 1" class="history__link" @click="emit('clickOnClearHistory')">Отменить все изменения</div>
  </div>
</template>

<style lang="scss" scoped>
.history {
  display: flex;
  align-items: center;

  &__btn {
    color: $grey-400;
    cursor: pointer;
    margin-right: 4px;
    transition: $transition;

    &:not(&_disabled):hover {
      color: $primary-color;
    }

    &, :deep(svg) {
      width: 16px;
      height: 16px;
    }

    &_disabled {
      color: $grey-300;
      cursor: default;
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
