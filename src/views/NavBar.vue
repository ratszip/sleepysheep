<template>
  <van-sticky class="navbar" :offset-top="1">
    <div class="nav_center">
      <van-tabs v-model="active">
        <van-tab disabled></van-tab>
        <van-tab title="关注"></van-tab>
        <van-tab title="推荐">
          <router-link to="/home"></router-link>
        </van-tab>
        <van-tab disabled></van-tab>
      </van-tabs>
    </div>
  </van-sticky>
</template>
<script >
export default {
  data() {
    return {
      active: 2,
    };
  },
  methods: {
    // async clickTab(index) {
    // if (index == 1) {
    //   await request({ url: "/index/sug" }).then(
    //     (res) => {
    //       this.show = false;
    //       console.log(res.data);
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // }
    // },
  },
};
</script>
<style lang="less">
.navbar {
  overflow: auto;
}
</style>