<script>
export default {
  props: {
    isReversed: Boolean,
  },
  computed: {
    title() {
      return this.isReversed ? 'Select defending type' : 'Select attacking type';
    },
  },
};
</script>

<template>
  <div class="TypeChartTitle">
    <h3>{{ title }}</h3>
    <button
      @click="$emit('update:isReversed', !isReversed)"
    >Reverse</button>
  </div>
</template>

<style scoped lang="scss">
.TypeChartTitle {
  display: flex;
}
</style>
