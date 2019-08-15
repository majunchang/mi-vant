<template>
  <div id="app">
    <div class="header">
      <div class="header-icon"></div>
      <div class="header-title">Mi-Vant</div>
      <div class="header-git"></div>
    </div>
    <div class="container">
      <div class="aside">
        <div class="title">
          <div class="doc-nav-title">开发指南</div>
          <div class="doc-nav-item" v-for="(item,index) in asideTitleArr" :key="index">{{item.name}}</div>
        </div>
        <div class="comp">
          <div class="doc-comp-title">组件</div>
          <div class="doc-comp" v-for="(item,index) in asideContentArr" :key="index">
            <div class="doc-comp-banner">{{item.name}}</div>
            <div class="doc-comp-item" v-for="(it,ind) in item.Arr" :key="ind">{{it.name}}</div>
          </div>
        </div>
      </div>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
// import "highlight.js/styles/color-brewer.css";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
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
  }
};
</script>

<style  lang='less'>
@import "./less/App.less";
</style>
