<template lang="pug">
.tab-content
  .content
    .detail-actions
      .heading Property-Infos
      .infos
        template(v-if='showInfo')
          ButtonFab.add-entry(v-if='showAddButton') ➕
          .count(v-if='propertyIsArray') Anzahl: {{ filteredEntries?.length ?? 0 }}/{{ getCount }}
          label(for='search-term') Suche nach GUID oder Name:
          .form-field
            input#search-term(
              type='text',
              v-model='searchTerm',
              autocomplete='off'
            )
        template(v-else) Keine Aktionen verfügbar
    template(v-if='showEmptyFallback')
      .fallback-text Keine Daten vorhanden
    template(v-else)
      .entry-list
        template(v-if='propertyIsArray')
          TransitionGroup(name='list-filter')
            template(v-for='entry of filteredEntries', :key='entry')
              PropertyItemEntry(:entry='entry')
        template(v-else)
          PropertyItemEntry(:entry='getFallBackEntry')
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useEditor } from '../../composables/use-editor';
import { useSchema } from '../../composables/use-schema';
import { IPropertyItemEntry } from '../../types/property-schema';
import ButtonFab from '../buttons/ButtonFab.vue';
import PropertyItemEntry from '../table/PropertyItemEntry.vue';

export default defineComponent({
  name: 'TabContent',
  components: {
    ButtonFab,
    PropertyItemEntry,
  },
  setup: () => {
    const { getDataOfSelectedTab, selectedTab } = useEditor();
    const { getPropertyType } = useSchema();
    const searchTerm = ref('');

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

    const getFallBackEntry = computed<IPropertyItemEntry>(
      (): IPropertyItemEntry => {
        let entry: IPropertyItemEntry;
        typeof getDataOfSelectedTab.value === 'string'
          ? (entry = {
              meta: { default: { name: getDataOfSelectedTab.value } },
            })
          : (entry = {
              guid: (getDataOfSelectedTab.value as IPropertyItemEntry)?.guid,
              meta: {
                default: {
                  name: (getDataOfSelectedTab.value as IPropertyItemEntry)?.meta
                    ?.default.name as string,
                },
              },
            });
        return entry;
      }
    );

    const filteredEntries = computed(() =>
      (getDataOfSelectedTab.value as IPropertyItemEntry[])?.filter(
        (entry) =>
          entry.guid
            ?.toLowerCase()
            .includes(searchTerm.value.trim().toLowerCase()) ||
          entry.meta?.default.name
            .toLowerCase()
            .includes(searchTerm.value.trim().toLowerCase())
      )
    );

    return {
      getDataOfSelectedTab,
      showEmptyFallback,
      showInfo,
      propertyIsArray,
      showAddButton,
      getCount,
      getFallBackEntry,
      filteredEntries,
      searchTerm,
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

    .count {
      min-width: 100px;
    }
  }
}

.fallback-text {
  text-align: center;
  font-size: 1.25em;
}

.entry-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1em;
}
</style>