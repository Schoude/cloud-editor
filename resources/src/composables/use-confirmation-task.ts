import { Ref, ref } from 'vue';

interface ConfirmationTask {
  title: string;
  description: string;
  buttonText: string;
  type?: 'deletion' | 'confirmation';
  confirm: () => Promise<void>;
}

const confirmationTask: Ref<ConfirmationTask | null> = ref(null);

export const useConfirmationTask = () => {
  const createConfirmationTask = (newConfirmationTask: ConfirmationTask) => {
    confirmationTask.value = newConfirmationTask;
  };

  return {
    createConfirmationTask,
    confirmationTask,
  };
};
