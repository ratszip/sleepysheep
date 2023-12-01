<template>
  <div>
    <van-empty class="empty" image="error" description="404" />
    <van-button type="default" class="back" @click="gohome"
      >返回首页</van-button
    >
  </div>
</template>
<script>
export default {
  methods: {
    gohome() {
      this.$router.push("/home");
    },
  },
};
</script>
<style lang="less">
.empty {
  margin-top: 200px;
}
.back {
  left: 50%;
  transform: translateX(-50%);
}
</style>