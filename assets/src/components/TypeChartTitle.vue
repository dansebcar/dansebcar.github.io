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
  <div class="flex">
    <h3>{{ title }}</h3>
    <button
      class="ml-2 px-2 bg-blue-400 hover:bg-blue-600 text-white"
      @click="$emit('update:isReversed', !isReversed)"
    >Reverse</button>
  </div>
</template>
