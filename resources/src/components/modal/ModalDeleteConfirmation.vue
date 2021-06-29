<template lang="pug">
.modal-delete-confirmation.modal-base(role='dialog')
  ModalHeader DELETE

  .modal__content
    span CONTENT HERE!
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useModalManager } from '../../composables/use-modal-manager';
import ModalHeader from './ui/ModalHeader.vue';

export default defineComponent({
  name: 'ModalDeleteConfirmation',
  components: {
    ModalHeader,
  },
  setup: () => {
    // const { hideModal } = useModalManager();
  },
});
</script>

<style lang="scss" scoped>
</style>