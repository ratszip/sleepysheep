<template>
  <div class="navbar">
    <div class="nav_left">
      <!-- <van-icon name="apps-o" /> -->
    </div>
    <div class="nav_center">
      <van-tabs v-model:active="active" @click="clickTab">
        <van-tab title="关注">
          <van-loading v-if="show" size="24px" vertical>加载中...</van-loading>
        </van-tab>
        <van-tab title="发现">
          <van-loading v-if="show" size="24px" vertical>加载中...</van-loading>
        </van-tab>
      </van-tabs>
    </div>
    <div class="nav_right">
      <!-- <van-icon name="search" /> -->
    </div>
  </div>
</template>
<script >
import { ref } from "vue";
import request from "@/util/request";
export default {
  data() {
    return {
      show: true,
      active: ref(1),
    };
  },
  methods: {
    async clickTab(index) {
      if (index == 1) {
        await request({ url: "/index/sug" }).then(
          (res) => {
            this.show = false;
            console.log(res.data);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    },
  },

  mounted() {
    this.clickTab(1);
    console.log("组件：mounted");
  },
};
</script>
<style lang="less">
.navbar {
  display: flex;
  flex-direction: row;
  .nav_left {
    flex: 1;
    text-align: start;
  }
  .nav_center {
    flex: 1;
    .nav_tab {
      display: flex;
      flex-direction: row;
    }
  }
  .nav_right {
    flex: 1;
    text-align: end;
  }
}
</style>