<template lang="pug">
.modal-property-detail.modal-base(role='dialog')
  ModalHeader {{ title }}

  .modal__content
    // exception version
    template(v-if='selectedTab === "version"')
      .entry-solo {{ entryWithData }}
    template(v-else)
      template(v-for='key of getActualKeysOfEntry.filter(e => e !== "meta")')
        .entry
          span.key {{ key }}:
          // handle array values
          template(v-if='Array.isArray(entryWithData[key])')
            template(v-for='aEntry of entryWithData[key]')
              .value {{ aEntry }}
          template(v-else)
            span.value {{ entryWithData[key] }}

      // exception meta field
      template(v-if='getActualKeysOfEntry.includes("meta")')
        .meta meta
        template(v-for='keyData of getMetaKeys')
          template(v-for='alphaKey of Object.keys(keyData)')
            .entry.key__sub {{ alphaKey }}:
            template(v-for='betaKey of keyData[alphaKey]')
              .entry.key__sub-2
                span.key {{ betaKey }}:
                span.value_sub {{ entryWithData.meta[alphaKey][betaKey] }}
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
  .entry {
    & ~ .entry {
      margin-top: 0.5em;
    }
  }

  .meta {
    font-weight: 700;
    margin-top: 1em;
    font-style: italic;
  }

  .key {
    font-weight: 700;
    margin-right: 1em;
  }

  .key__sub,
  .key__sub-2 .key {
    font-weight: 700;
  }

  .key__sub {
    margin-left: 0.5em;
  }

  .key__sub-2 {
    margin-left: 1em;
  }
</style>