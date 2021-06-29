import { Ref, ref } from 'vue';

interface DeletionTask {
  title: string;
  description: string;
  delete: () => Promise<void>;
}

const deletionTask: Ref<DeletionTask | null> = ref(null);

export const useDeletionTask = () => {
  const createDeletionTask = (newDeletionTask: DeletionTask) => {
    deletionTask.value = newDeletionTask;
  };

  return {
    createDeletionTask,
    deletionTask,
  };
};
