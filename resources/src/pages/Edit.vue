<template lang="pug">
section.edit
  p(v-for='property of properties') 
    <span :title='getDescription(property)'>ℹ️</span> {{ property }}
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useValidation } from '../composables/use-validation';

export default defineComponent({
  name: 'Edit',
  setup: () => {
    const { schema } = useValidation();
    const properties = computed(() =>
      Object.keys(schema.value?.properties as {})
    );

    function formatProperty(property: string): string {
      return property.endsWith('s') ? property.replace('s', '') : property;
    }

    function getDescription(property: string) {
      return schema.value?.definitions[formatProperty(property)]?.description;
    }

    return {
      schema,
      properties,
      getDescription,
    };
  },
});
</script>

<style lang="sass" scoped>
</style>