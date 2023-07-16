<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="eback" />
    <van-image
      class="etx"
      round
      width="60px"
      height="60px"
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
    />
    <van-field v-model="uname" label="用户名" placeholder="请输入用户名" />
    <van-field v-model="uintro" label="简介" placeholder="请输入简介" />
    <van-cell is-link title="性别" @click="show = true" class="gd" />
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      uname: "用户123123",
      uintro: "这是我的简介，这是我的温柔",
      show: false,
      actions: [{ name: "男" }, { name: "女" }, { name: "保密" }],
    };
  },
  methods: {
    onSelect() {},
    eback() {
      this.$router.back();
    },
  },
};
</script>
<style lang="less">
.etx {
  margin-top: 10px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.gd::before {
  position: absolute;
  content: "男";
  left: 230px;
}
</style>