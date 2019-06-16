<script>
export default {
  props: {
    type: Object,
    isSelected: {type: Boolean, default: false},
  },
  computed: {
    name() {
      return this.type.name;
    },
    backgroundColor() {
      return `#${this.type.color}`;
    },
    isListening() {
      return this.$listeners.select;
    },
  },
};
</script>

<template>
  <button
    :class="{isSelected, isListening}"
    :style="{backgroundColor}"
    class="TypeChartIcon"
    @click="$emit('select', name)"
  >
    {{ name }}
  </button>
</template>

<style>
.TypeChartIcon {
  font-size: 1.5em;
  margin: 5px;

  color: white;

  &.isSelected {
    font-weight: bold;
  }

  &.isListening {
    cursor: pointer;
  }
}
</style>
