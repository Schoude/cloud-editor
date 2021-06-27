<template lang="pug">
.modal-property-detail(role='dialog')
  ModalHeader {{ title }}

  // exception version
  template(v-if='selectedTab === "version"')
    div {{ entryWithData }}
  template(v-else)
    template(v-for='key of getActualKeysOfEntry.filter(e => e !== "meta")')
      div {{ key }}: {{ entryWithData[key] }}

    // exception no meta field
    template(v-if='getActualKeysOfEntry.includes("meta")')
      h1 meta
      template(v-for='keyData of getMetaKeys')
        template(v-for='alphaKey of Object.keys(keyData)')
          div {{ alphaKey }}:
          template(v-for='betaKey of keyData[alphaKey]')
            div {{ betaKey }}: {{ entryWithData.meta[alphaKey][betaKey] }}
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
        ? Object.keys(entryWithData.meta)
        : [];

      const keysComplete = alphaKeys.map((key) => {
        return {
          [key]: [...Object.keys(entryWithData.meta[key])],
        };
      });
      return keysComplete;
    });

    return {
      selectedTab,
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