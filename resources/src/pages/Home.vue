<template lang="pug">
section.home
  BaseButton(@click='openFile') JSON-Datei öffnen
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from '../components/buttons/BaseButton.vue';
import { useData } from '../composables/use-data';

export default defineComponent({
  name: 'Home',
  components: {
    BaseButton,
  },
  setup: () => {
    const { openFile, currentFile } = useData();

    return {
      openFile,
      currentFile,
    };
  },
});
</script>

<style lang="sass" scoped>
</style>