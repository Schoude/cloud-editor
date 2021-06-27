import { ref, Ref } from 'vue';
import { TheInrealCloudPropertySchema } from '../types/property-schema';
const schema: Ref<TheInrealCloudPropertySchema | null> = ref(null);

export const useSchema = () => {
  async function loadSchema() {
    const res = await fetch('../../schemas/cloud-property-schema.json');
    schema.value = await res.json();
  }

  function makePropertyNameSingular(propertyName: string): string {
    return propertyName.endsWith('s')
      ? propertyName.replace('s', '')
      : propertyName;
  }

  function getDescription(propertyName: string) {
    return schema.value?.definitions[makePropertyNameSingular(propertyName)]
      ?.description;
  }

  return {
    loadSchema,
    schema,
    makePropertyNameSingular,
    getDescription,
  };
};
