<template lang="pug">
section.home
  TheJsonFileLoader
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheJsonFileLoader from '../components/layout/TheJsonFileLoader.vue';

export default defineComponent({
  name: 'Home',
  components: {
    TheJsonFileLoader,
  },
});
</script>

<style lang="sass" scoped>
</style>