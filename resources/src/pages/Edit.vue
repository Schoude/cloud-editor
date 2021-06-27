<template lang="pug">
section.edit
  p(
    v-for='tab of getTabs',
    @click='setSelectedTab(tab)',
    :class='{ selected: isTabSelected(tab) }'
  ) 
    <span :title='getDescription(tab)'>ℹ️</span> {{ tab }}
  div {{ getDataOfSelectedTab }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useEditor } from '../composables/use-editor';
import { useSchema } from '../composables/use-schema';

export default defineComponent({
  name: 'Edit',
  setup: () => {
    const { getDescription } = useSchema();
    const {
      getTabs,
      getDataOfSelectedTab,
      setSelectedTab,
      selectedTab,
      isTabSelected,
    } = useEditor();

    setSelectedTab(getTabs.value[4]); // units

    return {
      getTabs,
      selectedTab,
      isTabSelected,
      setSelectedTab,
      getDescription,
      getDataOfSelectedTab,
    };
  },
});
</script>

<style lang="scss" scoped>
.selected {
  background-color: red;
}
</style>