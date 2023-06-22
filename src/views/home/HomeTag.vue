<template>
  <van-sticky class="navbar">
    <div class="content">
      <div class="nav_left ntab"></div>
      <div class="nav_center">
        <van-tabs v-model="active">
          <van-tab title="关注"></van-tab>
          <van-tab title="推荐">
            <router-link to="/home"></router-link>
          </van-tab>
        </van-tabs>
      </div>
      <div class="nav_right ntab"></div>
    </div>
  </van-sticky>
</template>
<script >
export default {
  data() {
    return {
      active: 1,
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
  .content {
    display: flex;
    display: -webkit-flex;
    background-color: #ffff;
  }
  .ntab {
    flex: 1;
  }
  .nav_center {
    flex: 2;
  }
}
</style>