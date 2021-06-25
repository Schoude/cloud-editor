<template lang="pug">
p This is App!
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  setup: () => {
    console.log(import.meta.env.VITE_APP_TITLE);
  },
});
</script>

<style lang="scss">
#app {
  p {
    font-size: 1.25em;
  }
}
</style>
