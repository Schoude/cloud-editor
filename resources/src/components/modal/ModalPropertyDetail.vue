<template lang="pug">
.modal-property-detail(role='dialog')
  | ModalPropertyDetail
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ModalPropertyDetail',
  props: {
    name: {
      type: String,
    },
  },
  setup: (props) => {
    // console.log(props);
  },
});
</script>

<style lang="scss" scoped>
.modal-property-detail {
  width: 450px;
  background-color: midnightblue;
  border-radius: 0.25em;
  align-items: center;
}
</style>