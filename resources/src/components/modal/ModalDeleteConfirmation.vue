<template lang="pug">
.modal-delete-confirmation.modal-base(role='dialog')
  ModalHeader {{ deletionTask?.title }}

  .modal__content
    div(v-html='deletionTask.description')

  .modal__actions
    BaseButton.btn-confirm-delete(@click='onConfirmDeleteClick') Löschen bestätigen
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDeletionTask } from '../../composables/use-deletion-task';
import { useModalManager } from '../../composables/use-modal-manager';
import BaseButton from '../buttons/BaseButton.vue';
import ModalHeader from './ui/ModalHeader.vue';

export default defineComponent({
  name: 'ModalDeleteConfirmation',
  components: {
    ModalHeader,
    BaseButton,
  },
  setup: () => {
    const { deletionTask } = useDeletionTask();
    const { hideModal } = useModalManager();

    async function onConfirmDeleteClick() {
      await deletionTask.value?.delete();
      hideModal();
    }

    return {
      onConfirmDeleteClick,
      deletionTask,
    };
  },
});
</script>

<style lang="scss" scoped>
.btn-confirm-delete {
  width: 100%;
}

.btn-confirm-delete {
  &::before {
    background-color: #960018;
  }
}
</style>