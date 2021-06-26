<template lang="pug">
button.base-button(role='button')
  span
    slot
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseButton',
});
</script>

<style lang="scss" scoped>
@use '../../styles/_button' as *;
@use '../../styles/_variables' as *;

.base-button {
  padding: 0.5em 1em;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 0.25em;

  @include curtain($color-primary) {
    position: relative;
    overflow: hidden;
  }
}
</style>