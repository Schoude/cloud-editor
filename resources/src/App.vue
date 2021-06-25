<template lang="pug">
TheHeader
.content
  TheSideMenu
  .router-view
    p Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ducimus sequi doloremque quasi iusto in impedit fuga facere nobis repellendus tempore aliquid quam ipsum modi officiis, magnam enim natus itaque!
    p Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ducimus sequi doloremque quasi iusto in impedit fuga facere nobis repellendus tempore aliquid quam ipsum modi officiis, magnam enim natus itaque!
    p Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ducimus sequi doloremque quasi iusto in impedit fuga facere nobis repellendus tempore aliquid quam ipsum modi officiis, magnam enim natus itaque!
    p Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ducimus sequi doloremque quasi iusto in impedit fuga facere nobis repellendus tempore aliquid quam ipsum modi officiis, magnam enim natus itaque!
    p Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ducimus sequi doloremque quasi iusto in impedit fuga facere nobis repellendus tempore aliquid quam ipsum modi officiis, magnam enim natus itaque!
    p Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ducimus sequi doloremque quasi iusto in impedit fuga facere nobis repellendus tempore aliquid quam ipsum modi officiis, magnam enim natus itaque!
    p Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ducimus sequi doloremque quasi iusto in impedit fuga facere nobis repellendus tempore aliquid quam ipsum modi officiis, magnam enim natus itaque!
    p Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ducimus sequi doloremque quasi iusto in impedit fuga facere nobis repellendus tempore aliquid quam ipsum modi officiis, magnam enim natus itaque!
    p Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ducimus sequi doloremque quasi iusto in impedit fuga facere nobis repellendus tempore aliquid quam ipsum modi officiis, magnam enim natus itaque!
    p Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ducimus sequi doloremque quasi iusto in impedit fuga facere nobis repellendus tempore aliquid quam ipsum modi officiis, magnam enim natus itaque!
    p Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ducimus sequi doloremque quasi iusto in impedit fuga facere nobis repellendus tempore aliquid quam ipsum modi officiis, magnam enim natus itaque!
    p Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ducimus sequi doloremque quasi iusto in impedit fuga facere nobis repellendus tempore aliquid quam ipsum modi officiis, magnam enim natus itaque!
    p Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ducimus sequi doloremque quasi iusto in impedit fuga facere nobis repellendus tempore aliquid quam ipsum modi officiis, magnam enim natus itaque!
    p Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ducimus sequi doloremque quasi iusto in impedit fuga facere nobis repellendus tempore aliquid quam ipsum modi officiis, magnam enim natus itaque!
    p Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ducimus sequi doloremque quasi iusto in impedit fuga facere nobis repellendus tempore aliquid quam ipsum modi officiis, magnam enim natus itaque!
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import TheHeader from "./components/layout/TheHeader.vue";
import TheSideMenu from "./components/layout/TheSideMenu.vue";

export default defineComponent({
  name: "App",
  components: {
    TheHeader,
    TheSideMenu,
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
@use './styles/_scrollbar' as *;

#app {
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  display: flex;
  overflow: auto;
}

p {
  font-size: 1.25em;
}

.router-view {
  flex: 1;
  overflow: auto;
  padding: 1em;
  @include scrollbar();
}
</style>
