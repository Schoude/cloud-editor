import { ref, Ref } from 'vue';
import { TheInrealCloudPropertySchema } from '../types/property-schema';
const schema: Ref<TheInrealCloudPropertySchema | null> = ref(null);

export function useSchema () {
  async function loadSchema () {
    const res = await fetch('../../schemas/cloud-property-schema.json');
    schema.value = await res.json();
  }

  function makePropertyNameSingular (propertyName: string): string {
    return propertyName.endsWith('ies')
      ? propertyName.replace('ies', 'y')
      : propertyName.endsWith('s')
        ? propertyName.slice(0, propertyName.length - 1)
        : propertyName;
  }

  function getDescription (propertyName: string) {
    return schema.value?.definitions[makePropertyNameSingular(propertyName)]
      ?.description;
  }

  function getPropertyType (propertyName: string) {
    return schema.value?.properties[propertyName].type;
  }

  // Gets all the primary keys of a property based on the schema.
  function getKeysOfProperty (propertyName: string) {
    return Object.keys(
      schema.value?.definitions[makePropertyNameSingular(propertyName)]
        .properties as {}
    );
  }

  return {
    loadSchema,
    schema,
    makePropertyNameSingular,
    getDescription,
    getPropertyType,
    getKeysOfProperty,
  };
}
