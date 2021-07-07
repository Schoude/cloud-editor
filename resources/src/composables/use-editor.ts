import { computed, Ref, ref } from 'vue';
import { TheInrealCloudProperty } from '../types/property';
import { useData } from './use-data';
import { useSchema } from './use-schema';
const { schema } = useSchema();
const { currentFile } = useData();

const getTabs = computed(() => Object.keys(schema.value?.properties as {}));
const selectedTab: Ref<keyof TheInrealCloudProperty | string> = ref('');

export function useEditor() {
  function setSelectedTab(tabName: keyof TheInrealCloudProperty | string) {
    selectedTab.value = tabName;
  }

  function isTabSelected(tab: keyof TheInrealCloudProperty | string) {
    return selectedTab.value === tab;
  }

  function getPropertyData<T, K extends keyof T>(property: T, key: K): T[K] {
    return property[key]; // property[key] is of type T[K]
  }

  const getDataOfSelectedTab = computed(() =>
    getPropertyData(
      currentFile.value as TheInrealCloudProperty,
      selectedTab.value as keyof TheInrealCloudProperty
    )
  );

  return {
    getTabs,
    setSelectedTab,
    getDataOfSelectedTab,
    selectedTab,
    isTabSelected,
  };
};
