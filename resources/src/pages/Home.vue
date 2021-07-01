<template lang="pug">
section.home
  TheJsonFileLoader
  TheFilesManager
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheFilesManager from '../components/layout/TheFilesManager.vue';
import TheJsonFileLoader from '../components/layout/TheJsonFileLoader.vue';

export default defineComponent({
  name: 'Home',
  components: {
    TheJsonFileLoader,
    TheFilesManager,
  },
});
</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
    row-gap: 2em;
  }
</style>