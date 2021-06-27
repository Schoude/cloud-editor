<template lang="pug">
component.modal-base(
  :is='activeModalData?.component',
  v-bind='activeModalData?.props'
)
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useModalManager } from '../../../composables/use-modal-manager';

export default defineComponent({
  name: 'ModalBase',
  setup: () => {
    const { activeModalData } = useModalManager();

    return {
      activeModalData,
    };
  },
});
</script>