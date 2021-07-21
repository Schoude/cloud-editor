<template lang="pug">
button.button-navigation(
  @click='onNavigateCLick',
  role='button',
  :class='{ active: isActiveRoute }'
)
  slot
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from '../../router/routing-info';

export default defineComponent({
  name: 'ButtonNavigation',
  props: {
    to: {
      type: String as PropType<ROUTE_NAMES>,
      required: true,
    },
  },
  setup: (props) => {
    const router = useRouter();

    async function onNavigateCLick() {
      await router.push({ name: props.to });
    }
    const isActiveRoute = computed(
      () => router.currentRoute.value.name === props.to
    );

    return {
      onNavigateCLick,
      isActiveRoute,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '../../styles/_variables' as *;

.button-navigation {
  font-size: 1.25em;
  transition: background-color 0.3s ease;
  padding: 0.25em 0;

  &.active {
    background-color: rgba($color-primary, 0.4);
  }

  &:hover,
  &:focus {
    background-color: rgba($color-primary, 0.2);
  }
}
</style>