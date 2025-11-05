<script setup>
  const model = defineModel()

  const emit = defineEmits(['confirm', 'cancel'])

  const cancel = () => {
    emit('cancel')
    model.value = false
  }
</script>

<template>
  <UiModal
    v-model="model"
    title="Удалить?"
  >
    <div class="">
      Восстановить удаленную заметку будет невозможно. Вы уверенны, что хотите удалить?
    </div>

    <template #footer>
      <div class="cancel__btns-wrap">
        <UiButton label="Да" @click="emit('confirm')" />
        <UiButton label="Нет" type="secondary" @click="cancel" />
      </div>
    </template>
  </UiModal>
</template>

<style lang="scss" scoped>
.cancel {
  &__btns-wrap {
    display: flex;

    & > *:not(:last-child) {
      margin-right: 8px;
    }
  }
}
</style>
