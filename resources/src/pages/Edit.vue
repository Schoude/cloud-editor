<template lang="pug">
section.edit
  TabControl
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TabControl from '../components/ui/TabControl.vue';

export default defineComponent({
  name: 'Edit',
  components: {
    TabControl,
  },
});
</script>

<style lang="scss" scoped>
</style>