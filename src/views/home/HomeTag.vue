<template>
  <van-sticky class="navbar">
    <div class="content">
      <div class="nav_left ntab"></div>
      <div class="nav_center">
        <van-tabs
          v-model="active"
          :before-change="beforeChange"
          @click="fclick"
        >
          <van-tab title="关注"></van-tab>
          <van-tab title="推荐">
            <!-- <router-link to="/home"></router-link> -->
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
    beforeChange(index) {
      if (index == 0 && localStorage.getItem("token") == null) {
        this.$root.$pop.open();
        return false;
      } else {
        return true;
      }
    },
    fclick() {
      this.$emit("switchTags", this.active);
    },
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