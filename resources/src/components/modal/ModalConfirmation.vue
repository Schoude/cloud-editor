<template lang="pug">
.modal-confirmation.modal-base(role='dialog', :class='[confirmationTask?.type]')
  ModalHeader {{ confirmationTask?.title }}

  .modal__content
    div(v-html='confirmationTask?.description')

  .modal__actions
    BaseButton.btn-confirm(@click='onConfirmClick') {{ confirmationTask?.buttonText }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useConfirmationTask } from '../../composables/use-confirmation-task';
import { useModalManager } from '../../composables/use-modal-manager';
import BaseButton from '../buttons/BaseButton.vue';
import ModalHeader from './ui/ModalHeader.vue';

export default defineComponent({
  name: 'ModalConfirmation',
  components: {
    ModalHeader,
    BaseButton,
  },
  setup: () => {
    const { confirmationTask } = useConfirmationTask();
    const { hideModal } = useModalManager();

    async function onConfirmClick() {
      await confirmationTask.value?.confirm();
      hideModal();
    }

    return {
      onConfirmClick,
      confirmationTask,
    };
  },
});
</script>

<style lang="scss" scoped>
  .btn-confirm {
    width: 100%;
  }

  .deletion {
    .btn-confirm {
      &::before {
        background-color: #960018;
      }
    }
  }
</style>