<template>
  <div class="bt_bar">
    <van-tabbar
      v-model="active"
      fixed
      placeholder
      active-color="#ee0a24"
      inactive-color="#000"
      @change="onChange"
    >
      <van-tabbar-item icon="home-o"></van-tabbar-item>
      <van-tabbar-item icon="add-o"></van-tabbar-item>
      <van-tabbar-item icon="user-o"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script >
export default {
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    onChange() {
      switch (this.active) {
        case 0:
          this.$router.push("/home");
          break;
        case 1:
          this.$router.push("/post");
          break;
        case 2:
          this.$router.push("/user");
          break;
        default:
          break;
      }
    },
  },
  watch: {
    $route: {
      handler(to, from) {
        // console.log(to);
        if (to.path == "/home") {
          this.active = 0;
        } else if (to.path == "/user") {
          this.active = 2;
        } else {
          this.active = 0;
        }
      },
      immediate: true,
    },
  },
};
</script>