/* eslint-disable */
<template>
  <div id="app">
    <router-view />
    <bottombar v-show="footer_show"></bottombar>
    <!-- <Pop></Pop> -->
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
  methods: {
    loginpop() {
      this.$pop.open();
    },
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
  mounted() {
    localStorage.setItem("token", "12312");
    if (localStorage.getItem("token") == null) {
      setTimeout(() => {
        this.$pop.open();
      }, 1000);
    }
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
  background-color: rgb(240, 240, 240);
}
</style>