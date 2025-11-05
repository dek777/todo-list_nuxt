<script setup>
  const emit = defineEmits(['close', 'open'])

  const model = defineModel()

  const slots = defineSlots()

  const props = defineProps({
    title: {
      type: String,
      default: ''
    }
  })

  const togglePopup = () => model.value = !model.value

  const uid = generateId().split('-')[0]
  const modalId = `modal_${uid}`

  const outsideClickHandler = e => {
    if (!modalId || e.target.closest(`#${modalId}`)) {
      return
    }
    togglePopup()
  }

  watch(model, () => emit(model.value ? 'open' : 'close'))
</script>

<template>
  <div
    v-if="model"
    class="popup__overlay"
    @click="outsideClickHandler"
  >
    <div
      :id="modalId"
      class="popup__modal"
    >
      <div class="popup__header">
        {{ title }}
        <nuxt-icon name="close" class="popup__close" @click="togglePopup" />
      </div>

      <div class="popup__body">
        <slot />
      </div>

      <div v-if="slots.footer" class="popup__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.popup {
  &__overlay {
    background: rgba(41, 35, 53, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 24px;
  }

  &__modal {
    background-color: #fff;
    width: 600px;
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 16px;
  }

  &__header {
    display: flex;
    align-items: center;
    min-height: 76px;
    padding: 24px 64px 16px 24px;
    font-weight: 500;
    font-size: 20px;
    line-height: 1.3;
    color: $text-grey-dark;
  }

  &__close {
    position: absolute;
    top: 22px;
    right: 22px;
    color: #808080;
    cursor: pointer;

    &, :deep(svg) {
      width: 12px;
      height: 12px;
    }
  }

  &__body {
    padding: 0 24px;
  }

  &__footer {
    padding: 16px 24px 24px;
  }

}
</style>
