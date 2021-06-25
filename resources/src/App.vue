<template lang="pug">
TheHeader
p This is App!
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import TheHeader from "./components/layout/TheHeader.vue";

export default defineComponent({
  name: "App",
  components: {
    TheHeader,
  },
  setup: () => {
    async function loadSchema() {
      const res = await fetch("./schemas/cloud-property-schema.json");
      console.log(await res.json());
    }

    onMounted(async () => await loadSchema());
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
