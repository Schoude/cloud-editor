import { Component, computed, ref, Ref, shallowRef, watch } from 'vue';
import ModalPropertyDetail from '../components/modal/ModalPropertyDetail.vue';

// add new modal names as union type
type RegisteredModalName = 'ModalPropertyDetail';

interface ActiveModalData<T> {
  component: Component;
  props?: T;
  persistent?: boolean;
}

// import new modal components above and add them to the registry here.
const modalRegistry = new Map()
  // .set(
  //   MyModal.name,
  //   MyModal
  // )
  .set(ModalPropertyDetail.name, ModalPropertyDetail);

const activeModalData: Ref<null | ActiveModalData<{}>> = ref(null);
const showModalBackDrop = computed(
  () => activeModalData.value?.component != null
);
const showModal = ref(false);

export const useModalManager = () => {
  /**
   * Main function to DISPLAY the modal.
   */
  const setActiveModal = <T>(
    componentName: RegisteredModalName | null,
    props?: T,
    persistent: boolean = true
  ) => {
    const modalToRender = modalRegistry.get(componentName);
    activeModalData.value = {
      component: shallowRef(modalToRender),
      props,
      persistent,
    };
  };

  /**
   * Main function to HIDE the modal.
   */
  const hideModal = () => (showModal.value = false);

  // Helper functions called by the modal transition.
  const displayModal = () => (showModal.value = true);
  const hideModalBackdrop = () => {
    setActiveModal(null);
  };

  return {
    setActiveModal,
    activeModalData,
    showModalBackDrop,
    showModal,
    hideModalBackdrop,
    displayModal,
    hideModal,
  };
};
