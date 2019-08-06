<template>
  <button :class="['button', { disabled } ]" :style="customStyle" @click="clickHandler">
    <slot />
    <slot name="desc" />
    <div v-if="loading" class="button__loading" />
  </button>
</template>

<script>
import "./style/index.less";
export default {
  name: "mi-vant-button",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    customStyle: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    clickHandler() {
      if (this.disabled) return;

      this.$emit("click");
    }
  }
};
</script>
