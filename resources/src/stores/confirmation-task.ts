import { defineStore } from 'pinia';

interface ConfirmationTask {
  title: string;
  description: string;
  buttonText: string;
  type?: 'deletion' | 'confirmation';
  confirm: () => Promise<void>;
}

interface ConfirmationTaskState {
  confirmationTask: ConfirmationTask | null;
}

export const useConfirmationTask = defineStore({
  id: 'confirmationTaskStore',
  state: (): ConfirmationTaskState => ({
    confirmationTask: null,
  }),
  actions: {
    createConfirmationTask (newConfirmationTask: ConfirmationTask) {
      this.confirmationTask = newConfirmationTask;
    },
    clearConfirmationTask () {
      this.confirmationTask = null;
    },
  },
});
