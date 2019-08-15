<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import "highlight.js/styles/color-brewer.css";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

const highlightCode = () => {
  const preEl = document.querySelectorAll("pre");
  preEl.forEach(el => {
    hljs.highlightBlock(el);
  });
};
export default {
  name: "App",
  mounted() {
    highlightCode();
  },
  updated() {
    highlightCode();
  }
};
</script>

<style  lang='css'>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
