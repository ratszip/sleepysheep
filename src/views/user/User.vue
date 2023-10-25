<template>
  <div class="pcenter">
    <userinfo @transUser="getuser"></userinfo>
    <usertabs></usertabs>
  </div>
</template>

<script>
import userinfo from "./UserInfo.vue";
import usertabs from "./userTab.vue";
export default {
  data() {
    return {
      uinfo: "",
    };
  },
  components: {
    userinfo,
    usertabs,
  },
  methods: {
    getuser(msg) {
      this.uinfo = msg;
    },
  },
};
</script>

<style lang="less">
.pcenter {
  position: fixed;
}
</style>