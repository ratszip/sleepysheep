<template>
  <div class="ffpage">
    <div class="fhead">
      <div class="nav_fleft ftab">
        <van-icon class="fback" @click="fback" name="arrow-left" />
      </div>
      <div class="nav_fcenter">
        <van-tabs v-model="active">
          <van-tab title="关注"></van-tab>
          <van-tab title="粉丝"> </van-tab>
        </van-tabs>
      </div>
      <div class="nav_fright ftab"></div>
    </div>
    <div class="fcontent">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    fback() {
      this.$router.back();
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
  },
};
</script>
<style lang="less">
.fhead {
  display: flex;
  display: -webkit-flex;
  background-color: #ffff;
  .fback {
    margin-top: 20px;
  }
}
.ftab {
  flex: 1;
}
.nav_fcenter {
  flex: 2;
}
</style>