<script setup>
  const emit = defineEmits(['click'])
  const slots = defineSlots()

  const props = defineProps({
    type: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary'].includes(value)
    },

    label: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: ''
    },

    disabled: {
      type: Boolean,
      default: false
    },
  })

  const classes = computed(() => {
    return [
      'ui-btn',
      `ui-btn_${props.size}`,
      `ui-btn_${props.type}`,
      props.square ? `ui-btn_${props.size}-square` : ''
    ]
  })

  const onClick = () => {
    if (!props.disabled) {
      emit('click')
    }
  }
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled"
    type="button"
    @click="onClick"
  >
    <nuxt-icon v-if="icon" :name="icon" class="ui-btn__icon" />
    <slot>
      <span v-if="label" class="ui-btn__label">{{ label }}</span>
    </slot>
  </button>
</template>

<style lang="scss" scoped>
.ui-btn {
  font-family: $base-font;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: $transition;
  border: 1px solid transparent;
  height: $controls-height;
  border-radius: $controls-border-radius;
  padding: 0 16px;

  &, &:active, &:focus, &:visited {
    outline: none;
  }

  &:disabled {
    box-shadow: none;
    opacity: .65;
    pointer-events: none;
  }

  &:not(:disabled) {
    cursor: pointer;
  }

  &__label {
    white-space: nowrap;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
  }

  &__icon {
    margin-right: 8px;

    &, :deep(svg) {
      width: 18px;
      height: 18px;
    }
  }

  &_primary {
    background-color: $purple-600;
    border-color: $purple-600;
    color: #fff;

    &:not(:disabled):hover {
      background-color: $purple-500;
      border-color: $purple-500;
    }

    &:disabled {
      color: #fff;
      background-color: $purple-300;
      border-color: $purple-300;
    }
  }

  &_secondary {
    background-color: transparent;
    border-color: $purple-600;
    color: $purple-600;

    &:not(:disabled):hover {
      border-color: $purple-500;
      color: $purple-500;
    }

    &:disabled {
      color: $purple-300;
      border-color: $purple-300;
    }
  }

}
</style>
