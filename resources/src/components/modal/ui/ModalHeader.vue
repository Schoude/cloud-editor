<template lang="pug">
.modal-header
  .title
    slot
  .actions
    button.btn-close(@click='hideModal', title='Schließen') ❌
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useModalManager } from '../../../composables/use-modal-manager';

export default defineComponent({
  name: 'ModalHeader',
  setup: () => {
    const { hideModal } = useModalManager();

    return {
      hideModal,
    };
  },
});
</script>

<style lang="scss" scoped>
  .modal-header {
    display: flex;
    padding-left: 1rem;
    height: 50px;
    align-items: center;
    font-size: 1.25em;

    .title {
      flex: 1;
    }

    .actions {
      align-self: stretch;

      .btn-close {
        height: 100%;
      }
    }
  }
</style>