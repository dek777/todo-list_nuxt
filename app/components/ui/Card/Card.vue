<script setup>

</script>

<template>
  <div class="ui-card">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.ui-card {
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 4px 20px -2px rgba(50, 50, 71, 0.08), 0px 0px 1px 0px rgba(12, 26, 75, 0.10);
}
</style>
