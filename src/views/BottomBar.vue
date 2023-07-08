<template>
  <div class="bt_bar">
    <van-tabbar
      v-model="active"
      fixed
      placeholder
      active-color="#ee0a24"
      inactive-color="#000"
    >
      <van-tabbar-item icon="home-o" @click="homeInfo"></van-tabbar-item>
      <van-tabbar-item icon="add-o" @click="addTopic"></van-tabbar-item>
      <van-tabbar-item icon="user-o" @click="uInfo"></van-tabbar-item>
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
    homeInfo() {},
    addTopic() {},
    uInfo() {},
  },
};
</script>