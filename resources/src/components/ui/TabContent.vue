<template lang="pug">
.tab-content {{ getDataOfSelectedTab }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useEditor } from '../../composables/use-editor';

export default defineComponent({
  name: 'TabContent',
  setup: () => {
    const { getDataOfSelectedTab } = useEditor();

    return {
      getDataOfSelectedTab,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>