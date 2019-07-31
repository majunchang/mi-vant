<template>
  <button :class="['button', { disabled } ]" :style="customStyle" @click="clickHandler">
    <slot />
    <slot name="desc" />
    <div v-if="loading" class="button__loading" />
  </button>
</template>

<script>
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

<style scoped>
.button {
  display: block;
  margin: 12px auto;
  width: 250px;
  height: 40px;
  font: 13px miui;
  color: #fff;
  background-color: #fbb212;
  border-radius: 25px;
  text-align: center;
}

.button.disabled {
  background: #d6d6d6;
}

.button__loading {
  display: inline-block;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0 auto 5px;
  width: 18px;
  height: 18px;
  /* background: url(./image/loading.webp) no-repeat; */
  background-size: 18px 18px;
  animation: spin linear 1s infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
