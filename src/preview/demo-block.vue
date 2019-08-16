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
      <p class="copy" @click="copy">复制</p>
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
  },
  methods: {
    copy(e) {
      const hightext = e.target.nextElementSibling;
      const input = document.createElement("input");
      document.body.appendChild(input);
      let value = hightext.innerText;
      input.value = value;
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        console.log("复制成功");
      }
      document.body.removeChild(input);
    }
  }
};
</script>
<style lang='less'>
@import "./less/base.less";
.copy {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 0;
}
</style>
