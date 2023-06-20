/* eslint-disable */
<template>
  <div id="app">
    <navbar></navbar>
    <router-view />
    <bottombar></bottombar>
  </div>
</template>

<script>
import navbar from "./views/NavBar.vue";
import bottombar from "./views/BottomBar.vue";
export default {
  name: "App",
  components: {
    navbar,
    bottombar,
  },
};
</script>

<style lang="less">
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  box-sizing: border-box;
  background-color: #fafafa;
}
</style>