<template lang="pug">
.modal-backdrop
  Transition(name='scale-modal', @before-leave='hideModalBackdrop')
    ModalBase(v-if='showModal')
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useModalManager } from '../../../composables/use-modal-manager';
import ModalBase from './ModalBase.vue';

export default defineComponent({
  name: 'ModalBackdrop',
  components: {
    ModalBase,
  },
  setup: () => {
    const { showModal, hideModalBackdrop } = useModalManager();
    return {
      hideModalBackdrop,
      showModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>