<template>
  <div id="app">
    <div class="header">
      <div class="header-title">Mi-Vant</div>
      <div class="header-git"></div>
    </div>
    <div class="container">
      <div class="aside">
        <div class="title">
          <div class="doc-nav-title">开发指南</div>
          <div
            class="doc-nav-item"
            v-for="(item,index) in asideTitleArr"
            :key="index"
            @click="goRouter(item.path)"
          >{{item.name}}</div>
        </div>
        <div class="comp">
          <div class="doc-comp-title">组件</div>
          <div class="doc-comp" v-for="(item,index) in asideContentArr" :key="index">
            <div class="doc-comp-banner">{{item.name}}</div>
            <div
              class="doc-comp-item"
              v-for="(it,ind) in item.Arr"
              :key="ind"
              @click="goRouter(it.path)"
            >{{it.name}}</div>
          </div>
        </div>
      </div>
      <div class="content">
        <router-view class="markdown"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// import "highlight.js/styles/color-brewer.css";
import hljs from "highlight.js";
import "highlight.js/styles/solarized-light.css";
import config from "./config";

const highlightCode = () => {
  const preEl = document.querySelectorAll("pre");
  preEl.forEach(el => {
    hljs.highlightBlock(el);
  });
};
export default {
  name: "App",
  data() {
    return {
      asideTitleArr: [],
      asideContentArr: []
    };
  },
  mounted() {
    this.asideTitleArr = config.asideTitleArr;
    this.asideContentArr = config.asideContentArr;
    highlightCode();
  },
  updated() {
    highlightCode();
  },
  methods: {
    goRouter(path) {
      this.$router.push(`${path}`);
    }
  }
};
</script>

<style  lang='less'>
@import "./less/App.less";
.hljs {
  /* display: block; */
  overflow-x: auto;
  min-width: 375px;
  max-width: 818px;
  padding: 0.5em;
  padding: 20px 24px 20px;
  background: #fdf6e3;
  color: #657b83;
  border-radius: 6px;
  background-color: #f2f4f5;
  -webkit-box-shadow: 0 8px 12px #ebedf0;
  box-shadow: 0 8px 12px #ebedf0;
}
</style>
