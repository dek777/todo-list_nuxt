<script setup>

</script>

<template>
  <div class="default-layout">
    <div class="default-layout__container">
      <div class="default-layout__header">
        <nuxt-link to="/" class="default-layout__page-title">TODO LIST</nuxt-link>
      </div>

      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  background-color: #FAFAFA;
  min-height: 100vh;

  &__container {
    width: 100%;
    max-width: $container-width;
    margin: auto;
    padding: 0 16px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $header-height;
  }

  &__page-title {
    color: $primary-color;
    font-size: 36px;
    font-weight: 700;
    line-height: 1.5;
    margin: 0 16px;
  }

}
</style>
