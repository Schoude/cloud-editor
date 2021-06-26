import { computed, ref, Ref } from 'vue';
import { TheInrealCloudPropertySchema } from '../types/property-schema';
const currentFile: Ref<TheInrealCloudPropertySchema | null> = ref(null);
const currentFileName = ref('');
const fileLoaded = computed(() => currentFile.value != null);

export const useData = () => {
  async function openJsonFile() {
    // @ts-ignore uses API that only works in Google Chrome
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: 'JSON Files',
            accept: {
              'application/json': ['.json'],
            },
          },
        ],
        excludeAcceptAllOption: true,
      });
      const file = await fileHandle.getFile();
      const contents = await file.text();
      currentFileName.value = file.name;
      currentFile.value = JSON.parse(contents);
    } catch (e: unknown) {
      console.log((e as Error).message);
    }
  }

  return {
    openJsonFile,
    currentFile,
    currentFileName,
    fileLoaded,
  };
};
