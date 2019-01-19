<script>
import TypeChartIcon from './TypeChartIcon.vue';

export default {
  components: {
    TypeChartIcon,
  },
  props: {
    value: Number,
    types: Array,
  },
};
</script>

<template>
  <li>
    <h4>{{ value }} &times;</h4>
    <TypeChartIcon
      v-for="type in types"
      :key="type.name"
      :type="type"
    />
  </li>
</template>
