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
    class="px-2 m-1 text-white"
    :class="{
      'font-bold': isSelected,
      'cursor-default': !isListening,
    }"
    :style="{ backgroundColor }"
    @click="$emit('select', name)"
  >
    {{ name }}
  </button>
</template>
