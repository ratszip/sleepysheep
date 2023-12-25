<template>
  <div>
    <van-tabs v-model="active">
      <van-tab title="帖子审核">
        <div ref="ct" class="cont">
          <shTopic></shTopic>
        </div>
      </van-tab>
      <van-tab title="评论审核">
        <div ref="ct" class="cont"></div>
      </van-tab>
      <van-tab title="用户权限">
        <div ref="ct" class="cont">
          <shuser></shuser>
        </div>
      </van-tab>
      <van-tab title="黑名单">
        <div ref="ct" class="cont"></div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import shTopic from "./shenhe/ManaTopic.vue";
import shuser from "./shenhe/ManaUser.vue";
export default {
  components: { shTopic, shuser },
  data() {
    return {
      active: 1,
    };
  },
  updated() {
    this.setContain();
  },
  mounted() {
    this.setContain();
  },
  methods: {
    async setContain() {
      await this.$nextTick();
      var ct = this.$refs.ct;
      ct.style.height = document.documentElement.clientHeight - 60 + "px";
    },
  },
};
</script>
<style>
.cont {
  width: 100%;
  overflow: scroll;
}
</style>