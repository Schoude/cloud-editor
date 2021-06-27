<template lang="pug">
.tab-content
  .content
    .details-actions
      .heading Property-Infos
      .infos
        template(v-if='showInfos')
          button.add-entry +
          .count Anzahl: {{ getCount }}
        template(v-else) Keine Aktionen verfügbar
    template(v-if='showEmptyFallback')
      .fallback-text Keine Daten vorhanden
    template(v-else)
      .entry-list {{ getDataOfSelectedTab }}
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useEditor } from '../../composables/use-editor';
import { useSchema } from '../../composables/use-schema';

export default defineComponent({
  name: 'TabContent',
  setup: () => {
    const { getDataOfSelectedTab, selectedTab } = useEditor();
    const { getPropertyType } = useSchema();
    const showEmptyFallback = computed(
      () =>
        (getDataOfSelectedTab.value as [])?.length === 0 ||
        getDataOfSelectedTab.value == null
    );

    const showInfos = computed(
      () => getPropertyType(selectedTab.value) === 'array'
    );

    const getCount = computed(() =>
      showInfos.value ? (getDataOfSelectedTab.value as []).length : 0
    );

    return {
      getDataOfSelectedTab,
      showEmptyFallback,
      showInfos,
      getCount,
    };
  },
});
</script>

<style lang="scss" scoped>
.details-actions {
  padding: 1em 0;

  .heading {
    font-size: 1.25em;
    margin-bottom: 0.5em;
  }

  .infos {
    display: flex;
  }
}

.fallback-text {
  text-align: center;
  font-size: 1.25em;
}
</style>