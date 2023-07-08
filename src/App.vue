/* eslint-disable */
<template>
  <div id="app">
    <router-view />
    <bottombar v-show="footer_show"></bottombar>
  </div>
</template>

<script>
import bottombar from "./views/BottomBar.vue";
export default {
  name: "App",
  components: {
    // navbar,
    bottombar,
  },
  data() {
    return {
      footer_show: true,
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        // console.log(to);
        if (to.path == "/home") {
          this.footer_show = true;
        } else if (to.path == "/user") {
          this.footer_show = true;
        } else {
          this.footer_show = false;
        }
      },
      immediate: true,
    },
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