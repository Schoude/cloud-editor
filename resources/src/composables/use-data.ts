import { computed, ref, Ref, watch } from 'vue';
import { TheInrealCloudPropertySchema } from '../types/property-schema';
const currentFile: Ref<TheInrealCloudPropertySchema | null> = ref(null);
const currentFileName = ref('');
const fileLoaded = computed(() => currentFile.value != null);
const saveFileName = ref('');

watch(
  currentFileName,
  (newVal) => (saveFileName.value = newVal.replace(/\.json/, ''))
);

export const useData = () => {
  async function openJsonFile() {
    try {
      // @ts-ignore new API that only works in Google Chrome
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

  async function saveFile() {
    try {
      await fetch('http://127.0.0.1:8080/json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: saveFileName.value,
          file: currentFile.value,
        }),
      });
    } catch (e: unknown) {
      console.log((e as Error).message);
    }
  }

  return {
    openJsonFile,
    currentFile,
    currentFileName,
    fileLoaded,
    saveFileName,
    saveFile,
  };
};
