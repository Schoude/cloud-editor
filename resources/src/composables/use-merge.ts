import { loadFile } from '../helpers/file-loader';

export const useMerge = () => {
  const loadCSVFile = async () => {
    try {
      const file = await loadFile({
        types: [
          {
            description: 'CSV Dateien',
            accept: {
              'text/csv': ['.csv'],
            },
          },
        ],
        excludeAcceptAllOption: true,
      });
      return file;
    } catch (error: unknown) {
      console.log((error as Error).message);
    }
  };

  return {
    loadCSVFile,
  };
};
