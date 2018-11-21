<script>
import HeaderItem from "./HeaderItem.vue";

export default {
  components: {
    HeaderItem,
  },
};
</script>

<template>
  <header>
    <header-item href="/">Home</header-item>
    <header-item href="/about">About</header-item>
    <header-item href="/skies-of-arcadia">Skies of Arcadia</header-item>
  </header>
</template>