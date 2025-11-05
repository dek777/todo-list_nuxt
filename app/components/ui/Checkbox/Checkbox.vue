<script setup>
  const checkbox = ref(null)

  const model = defineModel()

  const props = defineProps({
    label: {
      type: String,
      default: ''
    },

    readOnly: {
      type: Boolean,
      default: false
    }
  })

  const onClick = () => {
    if (!props.readOnly) {
      model.value = !model.value
    }
  }
</script>

<template>
  <div
    :class="[
      'ui-checkbox',
      {'ui-checkbox_checked': model},
    ]"
    @click="onClick"
  >
    <input
      v-model="model"
      ref="checkbox"
      type="checkbox"
    />

    <div class="ui-checkbox__input">
      <nuxt-icon name="check" class="ui-checkbox__checked-icon" />
    </div>

    <div v-if="label" :for="checkbox?.id" class="ui-checkbox__label">{{ label }}</div>

  </div>
</template>

<style lang="scss" scoped>
.ui-checkbox {
  cursor: pointer;
  display: flex;
  align-items: center;

  input {
    display: none;
  }

  &__label {
    display: inline-block;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: $text-grey-dark;
    cursor: pointer;
    transition: $transition;
    margin-left: 10px;
  }

  &__input {
    width: 20px;
    height: 20px;
    border: 2px solid $grey-300;
    border-radius: .25em;
    transition: $transition;
    position: relative;
  }

  &:hover:not(&_checked):not(&_disabled) &__input {
    border-color: $purple-400;
  }

  &_checked &__input {
    border-color: $primary-color;
    background-color: $primary-color;
  }

  &__checked-icon {
    opacity: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    transition: $transition;

    &, :deep(svg) {
      width: 20px;
      height: auto;
    }
  }

  &_checked &__checked-icon {
    opacity: 1;
  }

}
</style>
