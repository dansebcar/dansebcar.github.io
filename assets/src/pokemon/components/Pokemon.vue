<script>
import types from '../types.yaml';

import TypeChart from 'components/TypeChart.vue';

export default {
  components: {
    TypeChart,
  },
  data() {
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
