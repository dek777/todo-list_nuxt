<script setup>
  const emit = defineEmits(['blur'])

  const input = ref(null)

  const props = defineProps({
    label: {
      type: String,
      default: ''
    },

    errorText: {
      type: String,
      default: ''
    },

    placeholder: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: ''
    },

    required: {
      type: Boolean,
      default: false
    },
  })

  const slots = defineSlots()

  const model = defineModel()

</script>

<template>
  <div class="ui-input__container">
    <div v-if="label" class="ui-input__label">
      {{ label }}
      <span v-if="required" class="ui-input__label ui-input__required">*</span>
    </div>

    <div
      :class="[
        'ui-input',
        {'ui-input_error': errorText},
      ]"
    >

      <div v-if="slots.beforeInput">
        <slot name="beforeInput" />
      </div>

      <nuxt-icon
        v-if="icon"
        :name="icon"
        class="ui-input__icon"
      />

      <input
        ref="input"
        v-model="model"
        :class="[
          'ui-input__control',
          {'ui-input_with-icon': icon},
        ]"
        :placeholder="placeholder"
        @blur="emit('blur')"
      />
    </div>

    <div v-if="errorText" class="ui-input__error">
      {{ errorText }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin placeholder-font() {
  font-family: $base-font;
  font-size: 12px;
  font-weight: 400;
  line-height: 1;
  color: $grey-400 !important;
}

.ui-input {
  font-family: $base-font;
  border: 1px solid $grey-300;
  transition: $transition;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  height: $controls-height;
  font-weight: 400;
  font-size: 12px;
  padding-top: 0;
  border-radius: $controls-border-radius;

  & .ui-input_with-icon {
    &, &:focus, &:active {
      padding-left: 0;
    }
  }

  &__control {
    font-size: 12px;
    font-weight: 400;
    line-height: 1;
  }

  &__icon {
    margin: 0 8px;
    color: $text-grey-light;

    &, :deep(svg) {
      width: 14px;
      height: 14px;
    }
  }

  &__container {
    font-family: $base-font;
  }

  input, input:focus, input:active {
    outline: none;
    border: none;
    background-image: none;
    background-color: transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    font-family: $base-font;
    margin: 0;
    padding: 0 16px;
    flex: 1;
    height: 100%;
    transition: $transition;
    color: $text-grey-dark;
  }

  &:hover:not(&_error),
  &:focus-within:not(&_error) {
    border-color: $primary-color;
  }

  &_error {
    border-color: $error-color;
  }

  input::placeholder {
    @include placeholder-font();
  }
  input:-moz-placeholder {
    @include placeholder-font();
  }
  input::-moz-placeholder {
    @include placeholder-font();
  }
  input:-ms-input-placeholder {
    @include placeholder-font();
  }
  input::-webkit-input-placeholder {
    @include placeholder-font();
  }


  &__label {
    color:$text-grey-dark;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.3;
    margin-bottom: 8px;
    display: inline-block;
    font-family: $base-font;
  }

  &__error {
    font-weight: 400;
    font-size: 11px;
    line-height: 12px;
    color: $error-color;
    margin-top: 8px;
  }

}
</style>
