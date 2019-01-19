<script>
import types from '../types.yaml';

import TypeChart from 'components/TypeChart.vue';

export default {
  components: {
    TypeChart,
  },
  data() {
    for (const [name, type] of Object.entries(types)) {
      type.name = name;
    }

    return {
      types,
    };
  },
};
</script>

<template>
  <div>
    <h1>Pokémon</h1>
    <TypeChart
      :types="types"
    />
  </div>
</template>

<style scoped lang="scss">
</style>
