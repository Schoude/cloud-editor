import { computed, ref, Ref, watch } from 'vue';
import { FileData, loadFile } from '../helpers/file-loader';
import { TheInrealCloudProperty } from '../types/property';
const currentFile: Ref<TheInrealCloudProperty | null> = ref(null);
const currentFileName = ref('');
const fileLoaded = computed(() => currentFile.value != null);
const saveFileName = ref('');
const existingFiles: Ref<string[]> = ref([]);

watch(
  currentFileName,
  (newVal) => (saveFileName.value = newVal.replace(/\.json/, ''))
);

export const useData = () => {
  async function openJsonFile() {
    try {
      const fileData = (await loadFile({
        types: [
          {
            description: 'JSON Datein',
            accept: { 'application/json': ['.json'] },
          },
        ],
        excludeAcceptAllOption: true,
      })) as FileData;

      currentFileName.value = fileData.name;
      currentFile.value = JSON.parse(fileData.contents);
    } catch (e: unknown) {
      console.log((e as Error).message);
    }
  }

  async function writeJsonFile(
    fileName: string,
    content: TheInrealCloudProperty
  ) {
    try {
      // @ts-ignore
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: fileName,
        types: [
          {
            description: 'JSON Datei',
            accept: {
              'application/json': ['.json'],
            },
          },
        ],
        excludeAcceptAllOption: true,
      });
      // Create a FileSystemWritableFileStream to write to.
      const writable = await fileHandle.createWritable();
      // Write the contents of the file to the stream.
      await writable.write(JSON.stringify(content));
      // Close the file and write the contents to disk.
      await writable.close();
    } catch (e: unknown) {
      console.log((e as Error).message);
    }
  }

  async function saveFile() {
    try {
      await fetch('http://127.0.0.1:1234/json', {
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

  async function deleteFile(fileName: string) {
    try {
      await fetch(`http://127.0.0.1:1234/file/${fileName}`, {
        method: 'DELETE',
      });
    } catch (e: unknown) {
      console.log((e as Error).message);
    }
  }

  async function loadFiles() {
    try {
      const filesList = await fetch('http://127.0.0.1:1234/files');
      existingFiles.value = await filesList.json();
    } catch (e: unknown) {
      console.log((e as Error).message);
    }
  }

  async function loadFileFromStorage(fileName: string) {
    try {
      const res = await fetch(`http://127.0.0.1:1234/file/${fileName}`);
      const data = await res.json();
      return {
        fileName: data.fileName,
        file: JSON.parse(data.contents),
      } as { file: TheInrealCloudProperty; fileName: string };
    } catch (e: unknown) {
      console.log((e as Error).message);
    }
  }

  function setCurrentFile(fileName: string, file: TheInrealCloudProperty) {
    currentFileName.value = fileName;
    currentFile.value = file;
  }

  return {
    openJsonFile,
    writeJsonFile,
    currentFile,
    currentFileName,
    fileLoaded,
    saveFileName,
    saveFile,
    loadFiles,
    deleteFile,
    existingFiles,
    loadFileFromStorage,
    setCurrentFile,
  };
};
