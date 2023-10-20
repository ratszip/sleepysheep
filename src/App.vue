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
      online: navigator.onLine,
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
        } else if (to.path == "/user/0") {
          this.footer_show = true;
        } else {
          this.footer_show = false;
        }
      },
      immediate: true,
    },
  },
  mounted() {
    // localStorage.setItem("token", "12312");
    window.addEventListener("online", this.updateOnlineStatus); // 网络由异常到正常时触发
    window.addEventListener("offline", this.updateOnlineStatus); // 网络由正常常到异常时触发

    if (localStorage.getItem("token") == null) {
      setTimeout(() => {
        this.$pop.open();
      }, 1000);
    }
  },
  beforeDestroy() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
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