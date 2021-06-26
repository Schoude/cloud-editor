import { ref, Ref } from 'vue';
import { TheInrealCloudPropertySchema } from '../types/property-schema';
const schema: Ref<TheInrealCloudPropertySchema | null> = ref(null);

export const useValidation = () => {
  async function loadSchema() {
    const res = await fetch('../../schemas/cloud-property-schema.json');
    schema.value = (await res.json()) as TheInrealCloudPropertySchema;
  }

  return {
    loadSchema,
    schema,
  };
};
