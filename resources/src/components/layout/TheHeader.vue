<template lang="pug">
header.the-header
  h1 Cloud Editor
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheHeader",
});
</script>

<style lang="scss" scoped>
@use '../../styles/_variables' as *;

.the-header {
  padding: 0.5em 2em;
  background-color: $color-element;
}

h1 {
  font-size: 1.25em;
}
</style>