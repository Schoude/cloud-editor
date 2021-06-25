<template lang="pug">
aside.the-side-menu
  p side-menu-item
  p side-menu-item
  p side-menu-item
  p side-menu-item
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheSideMenu",
});
</script>

<style lang="scss" scoped>
@use '../../styles/_variables' as *;

.the-side-menu {
  width: 200px;
  background-color: $color-element-alt;
}
</style>