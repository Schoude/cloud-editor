<template lang="pug">
.modal-property-detail(role='dialog')
  ModalHeader {{ title }}
  span ModalPropertyDetail
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ModalHeader from './ui/ModalHeader.vue';

export default defineComponent({
  name: 'ModalPropertyDetail',
  components: {
    ModalHeader,
  },
  props: {
    title: {
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
  width: 600px;
  background-color: midnightblue;
  border-radius: 0.25em;
  align-items: center;
}
</style>