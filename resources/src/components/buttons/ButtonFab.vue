<template lang="pug">
button.button-fab(role='button', :class='classes')
  slot
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'ButtonFab',
  props: {
    color: {
      type: String,
    },
  },
  setup: (props) => {
    const classes = computed(() => {
      return {
        [props.color as string]: props.color !== '',
      };
    });

    return {
      classes,
    };
  },
});
</script>

<style lang="scss" scoped>
  @use '../../styles/_button' as *;
  @use '../../styles/_variables' as *;

  .button-fab {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid $color-primary;
    font-size: 1.25em;

    @include curtain($color-primary) {
      position: relative;
      overflow: hidden;
    }

    &.red {
      border: 1px solid #960018;
      @include curtain(#960018) {
        position: relative;
        overflow: hidden;
      }
    }
  }
</style>