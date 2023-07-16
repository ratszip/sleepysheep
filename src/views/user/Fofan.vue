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
        <div class="fdet">
          <van-image
            class="imgs"
            round
            width="36px"
            height="36px"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="funame">user123u1290</div>
          <van-button class="follow" size="small" round type="info" plain
            >已关注</van-button
          >
        </div>
        <div class="fdet">
          <van-image
            class="imgs"
            round
            width="36px"
            height="36px"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="funame">user123u1290</div>
          <van-button class="follow" size="small" round type="info" plain
            >已关注</van-button
          >
        </div>
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
.fcontent {
  margin-top: 10px;
}
.fdet {
  background-color: white;
  // display: flex;
  height: 80px;
  // margin: 0 auto;
  margin-top: 10px;
  padding: 0px 50px;

  .funame {
    // flex: 2;
    text-overflow: ellipsis;
    display: inline-block;
    font-size: 30px;
    height: 72px;
    width: 210px;
    vertical-align: middle;
    margin-left: 30px;
  }
  .follow {
    margin-left: 180px;
    margin-top: -40px;
    width: 120px;
    height: 40px;
    display: inline-block;
    vertical-align: middle;
  }
}
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