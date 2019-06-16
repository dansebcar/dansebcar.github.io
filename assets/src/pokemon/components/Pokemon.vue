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
    <TypeChart
      :types="types"
    />
  </div>
</template>
