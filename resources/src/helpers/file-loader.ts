type FileExtension = '.json';
type Accept = { 'application/json': FileExtension[] };
type FileType = {
  description: string;
  accept: Accept;
};

interface FileOptions {
  types: FileType[];
  excludeAcceptAllOption: boolean;
}

export interface FileData {
  contents: any;
  name: string;
}

export async function loadFile(
  options: FileOptions
): Promise<FileData | undefined> {
  try {
    // @ts-ignore new API that only works in Google Chrome
    const [fileHandle] = await window.showOpenFilePicker(options);
    const file = await fileHandle.getFile();
    return {
      contents: await file.text(),
      name: file.name,
    };
  } catch (e: unknown) {
    console.log((e as Error).message);
  }
}
