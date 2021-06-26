import { computed, ref, Ref } from 'vue';
import { TheInrealCloudPropertySchema } from '../types/property-schema';
const currentFile: Ref<TheInrealCloudPropertySchema | null> = ref(null);
const fileLoaded = computed(() => currentFile.value != null);

export const useData = () => {
  async function openFile() {
    // @ts-ignore uses API that only works in Google Chrome
    const [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const contents = await file.text();
    currentFile.value = JSON.parse(contents);
  }

  return {
    openFile,
    currentFile,
    fileLoaded,
  };
};
