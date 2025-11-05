<script setup>
  const emit = defineEmits(['change', 'clickOnRemove'])

  const props = defineProps({
    task: {
      type: Object,
      required: true
    }
  })

  const taskData = reactive({
    id: props.task.id,
    text: props.task.text || '',
    checked: !!props.task.checked
  })

  const isEditTextMode = ref(false)
  const textBlockHeight = ref(null)
  const inputRef = ref(null)
  const textRef = ref(null)

  const activateEditMode = () => {
    if (isEditTextMode.value) {
      return
    }

    textBlockHeight.value = textRef.value ? textRef.value.clientHeight + 20 : 20
    isEditTextMode.value = true
    nextTick(() => inputRef.value.focus())
  }

  const onInput = () => {
    textBlockHeight.value = textBlockHeight.value < inputRef.value.scrollHeight ? inputRef.value.scrollHeight : textBlockHeight.value
  }

  const onBlur = () => {
    isEditTextMode.value = false
    onChangeTask()
  }

  const onChangeTask = () => {
    emit('change', taskData)
  }

  if (!taskData.text) {
    activateEditMode()
  }

  let stopTaskWatcher = null

  onMounted(() => {
    stopTaskWatcher = watch(() => props.task, () => {
      taskData.id = props.task.id
      taskData.text = props.task.text || ''
      taskData.checked = !!props.task.checked
    })
  })

  onBeforeUnmount(() => {
    if (typeof stopTaskWatcher === 'function') {
      stopTaskWatcher()
    }
  })

</script>

<template>
  <div class="item">
    <UiCheckbox v-model="taskData.checked" @update:modelValue="onChangeTask" />

    <textarea
      v-if="isEditTextMode"
      v-model="taskData.text"
      ref="inputRef"
      class="item__input"
      :style="{ 'height': textBlockHeight ? `${textBlockHeight}px` : 'auto'}"
      :height="textBlockHeight ? `${textBlockHeight}px` : 'auto'"
      @blur="onBlur"
      @input="onInput"
    />
    <p
      v-else ref="textRef"
      :class="[
        'item__text',
        {'item__text_checked': taskData.checked}
      ]"
    >
      {{taskData.text}}
    </p>

    <div class="item__btns-wrap">
      <nuxt-icon name="pen" class="item__btn" filled @click="activateEditMode" />
      <nuxt-icon name="trash" class="item__btn" filled @click="emit('clickOnRemove', taskData)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: start;
  margin: 8px 0;

  &__input,
  &__text {
    flex: 1;
    margin: 0 16px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.1;
    color: $text-grey-dark;
    margin-top: 1px;
    word-break: break-word;
  }

  &__input {
    font-family: $base-font;

    &, &:focus {
      border: 0;
      outline: 0;
    }
  }

  &__btns-wrap {
    display: flex;
    margin-left: auto;
  }

  &__btn {
    color: $grey-400;
    transition: $transition;
    cursor: pointer;

    &:hover {
      color: $primary-color;
    }

    &:not(:last-child) {
      margin-right: 8px;
    }

    &, :deep(svg) {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
