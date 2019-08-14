<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      modalShow: true,
      msg: "组件库测试",
      modal: {
        msg: "前往想看APP观看原视频,播放更流畅",
        confirmText: "确定",
        cancelText: "取消"
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped >
@background-color: red;
@text-color: yellowGreen;

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
a {
  color: @text-color;
}

.text {
  color: red;
}

h1 {
  color: @text-color;
}
</style>
