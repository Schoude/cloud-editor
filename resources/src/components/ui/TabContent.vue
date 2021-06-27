<template lang="pug">
.tab-content
  .content
    .detail-actions
      .heading Property-Infos
      .infos
        template(v-if='showInfo')
          ButtonFab.add-entry(v-if='showAddButton') ➕
          .count(v-if='propertyIsArray') Anzahl: {{ getCount }}
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
import ButtonFab from '../buttons/ButtonFab.vue';

export default defineComponent({
  name: 'TabContent',
  components: {
    ButtonFab,
  },
  setup: () => {
    const { getDataOfSelectedTab, selectedTab } = useEditor();
    const { getPropertyType } = useSchema();

    const showEmptyFallback = computed(
      () =>
        (getDataOfSelectedTab.value as [])?.length === 0 ||
        getDataOfSelectedTab.value == null
    );

    const showInfo = computed(
      () => getDataOfSelectedTab.value == null || propertyIsArray.value
    );

    const propertyIsArray = computed(
      () => getPropertyType(selectedTab.value) === 'array'
    );

    const showAddButton = computed(
      () => getDataOfSelectedTab.value == null || propertyIsArray.value
    );

    const getCount = computed(
      () => (getDataOfSelectedTab.value as [])?.length ?? 0
    );

    return {
      getDataOfSelectedTab,
      showEmptyFallback,
      showInfo,
      propertyIsArray,
      showAddButton,
      getCount,
    };
  },
});
</script>

<style lang="scss" scoped>
.detail-actions {
  padding: 1em 0;

  .heading {
    font-size: 1.25em;
    margin-bottom: 0.5em;
  }

  .infos {
    display: flex;
    align-items: center;
    column-gap: 1em;
    min-height: 40px;
  }
}

.fallback-text {
  text-align: center;
  font-size: 1.25em;
}
</style>