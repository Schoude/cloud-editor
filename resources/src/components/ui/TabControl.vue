<template lang="pug">
.tab-control
  .tabs-header
    template(v-for='tab of getTabs')
      TabHeaderItem(:tabName='tab')
  TabContent
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useEditor } from '../../composables/use-editor';
import TabContent from './TabContent.vue';
import TabHeaderItem from './TabHeaderItem.vue';

export default defineComponent({
  name: 'TabControl',
  components: {
    TabHeaderItem,
    TabContent,
  },
  setup: () => {
    const { getTabs, setSelectedTab } = useEditor();

    setSelectedTab(getTabs.value[4]); // units

    return {
      getTabs,
      setSelectedTab,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '../../styles/_scrollbar' as *;

.tabs-header {
  display: flex;
  overflow: auto;
  @include scrollbar(true);
}
</style>