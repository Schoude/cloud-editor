<template lang="pug">
.modal-property-detail(role='dialog')
  ModalHeader {{ title }}
  div 1st level keys {{ getActualKeysOfEntry }}
  div meta keys {{ getMetaKeys }}
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useData } from '../../composables/use-data';
import { useEditor } from '../../composables/use-editor';
import { TheInrealCloudProperty } from '../../types/property';
import { IPropertyItemEntry } from '../../types/property-schema';
import ModalHeader from './ui/ModalHeader.vue';

export default defineComponent({
  name: 'ModalPropertyDetail',
  components: {
    ModalHeader,
  },
  props: {
    title: {
      type: String,
    },
    entryBaseInfo: {
      type: Object as PropType<IPropertyItemEntry>,
      required: true,
    },
  },
  setup: (props) => {
    const { selectedTab } = useEditor();
    const { currentFile } = useData();
    const entryWithData =
      selectedTab.value === 'version'
        ? currentFile.value?.version
        : selectedTab.value === 'globalConfig'
        ? currentFile.value?.globalConfig
        : // @ts-ignore
          currentFile.value?.[
            selectedTab.value as keyof TheInrealCloudProperty
            // @ts-ignore
          ].find(
            // @ts-ignore
            (entry: any) => entry.guid === (props.entryBaseInfo.guid as string)
          );

    const getActualKeysOfEntry = computed(() =>
      selectedTab.value === 'version' ? [] : Object.keys(entryWithData)
    );

    const getMetaKeys = computed(() => {
      const alphaKeys = getActualKeysOfEntry.value.includes('meta')
        ? //@ts-ignore
          Object.keys(entryWithData.meta)
        : [];

      const keysComplete = alphaKeys.map((key) => {
        return {
          // @ts-ignore
          [key]: Object.keys(entryWithData.meta[key]),
        };
      });
      return keysComplete;
    });

    return {
      getActualKeysOfEntry,
      getMetaKeys,
      entryWithData,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '../../styles/_variables' as *;

.modal-property-detail {
  width: 600px;
  background-color: $color-element;
  border-radius: 0.25em;
  align-items: center;
}
</style>