<template>
  <div class="demo-block">
    <div class="demo-block-source">
      <slot name="source"></slot>
      <span class="demo-block-code-icon" v-if="!$slots.default" @click="showCode=!showCode">
        <img
          alt="expand code"
          src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg"
          class="code-expand-icon-show"
        />
      </span>
    </div>
    <div class="demo-block-meta" v-if="$slots.default">
      <slot></slot>
      <span v-if="$slots.default" class="demo-block-code-icon" @click="showCode=!showCode">
        <img
          alt="expand code"
          src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg"
          class="code-expand-icon-show"
        />
      </span>
    </div>
    <div class="demo-block-code" v-show="showCode">
      <slot name="highlight"></slot>
    </div>
  </div>
</template>
<script type="text/babel">
export default {
  data() {
    return {
      showCode: false
    };
  }
};
</script>
<style lang='less'>
@import "./less/base.less";
</style>
