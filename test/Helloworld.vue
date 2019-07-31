<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <mi-vant-button>按钮</mi-vant-button>
    <mi-vant-modal
      :show="modalShow"
      :msg="modal.msg"
      :close="false"
      :confirm-text="modal.confirmText"
      :cancel-text="modal.cancelText"
    />
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      modalShow: false,
      msg: "组件库测试1",
      modal: {
        msg: "前往想看APP观看原视频,播放更流畅",
        confirmText: "确定",
        cancelText: "取消"
      }
    };
  },
  methods: {
    confirm() {
      this.modalShow = false;
      console.log("点击确认按钮");
    },
    concel() {
      this.modalShow = false;
      console.log("点击取消按钮");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@default: #fff;
@main: #07c160;
@info: #1989fa;
@danger: #f44;
@warn: #ff976a;

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
h1 {
  color: @danger;
}
</style>
