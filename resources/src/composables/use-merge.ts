import { FileData } from './../helpers/file-loader';
import { loadFile } from '../helpers/file-loader';
import Papa from 'papaparse';
import { ref, Ref } from 'vue';
import { TheInrealCloudProperty, TheUnitSchema } from '../types/property';
import { useData } from './use-data';
const { currentFile, currentFileName } = useData();
const csvUnitsWithData: Ref<TheUnitSchema[]> = ref([]);

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

  const generateUnitsFromCSVFile = (csvFile: FileData) => {
    if (csvUnitsWithData.value.length > 0) {
      csvUnitsWithData.value = [];
    }

    const result = Papa.parse(csvFile.contents, {
      delimiter: ';',
      dynamicTyping: true,
      skipEmptyLines: true,
      fastMode: true,
    });
    const headers = result.data.splice(0, 1).flat() as string[];
    const unitsData = result.data as string[][];

    unitsData.forEach((unit) => {
      const unitWithData: { [key: string]: any } = {};

      unit.forEach((value, index) => {
        if (value == null) {
          return;
        }

        // array values seperated by ',';
        // headers can have multiple appearances in the csv, mostly for array values
        if (unitWithData.hasOwnProperty(headers[index])) {
          if (Array.isArray(unitWithData[headers[index]])) {
            unitWithData[headers[index]].push(...value.split(','));
          } else {
            unitWithData[headers[index]] = [
              unitWithData[headers[index]],
              ...value.split(','),
            ];
          }
        }
        // meta data
        else if (headers[index].includes('meta')) {
          const metaKeys = headers[index].split('/');

          // TODO: make nesting level less verbose (tied to be always three levels deep)
          // check if the nested meta object exist
          // if not assign it to be an empty object
          if (!unitWithData.hasOwnProperty(metaKeys[0])) {
            unitWithData[metaKeys[0]] = {};
          }
          if (!unitWithData[metaKeys[0]].hasOwnProperty([metaKeys[1]])) {
            unitWithData[metaKeys[0]][metaKeys[1]] = {};
          }
          unitWithData[metaKeys[0]][metaKeys[1]][metaKeys[2]] = value;
        }
        // all other headers
        else {
          unitWithData[headers[index]] =
            // check for initial array values seperated by ','
            typeof value === 'string' && value.includes(',')
              ? value.split(',')
              : value;
        }
      });
      csvUnitsWithData.value.push(unitWithData as TheUnitSchema);
    });
  };

  const clearCSVUnits = () => {
    csvUnitsWithData.value = [];
  };

  const mergeAllUnits = async () => {
    (currentFile.value as TheInrealCloudProperty).units.push(
      ...csvUnitsWithData.value
    );

    currentFileName.value = `${currentFileName.value}_merged`;
  };

  return {
    loadCSVFile,
    generateUnitsFromCSVFile,
    csvUnitsWithData,
    clearCSVUnits,
    mergeAllUnits,
  };
};
