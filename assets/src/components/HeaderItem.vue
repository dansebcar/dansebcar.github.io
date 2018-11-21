<script>
export default {
  props: {
    href: {type: String, required: true},
  },
};
</script>

<template>
  <a
    :href="href"
    class="HeaderItem"
  >
    <slot></slot>
  </a>
</template>

<style scoped lang="scss">
.HeaderItem {
  margin: 5px 20px;
}
</style>