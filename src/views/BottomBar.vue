<template>
  <div class="bt_bar">
    <van-tabbar
      ref="btheight"
      v-model="active"
      fixed
      placeholder
      active-color="#ee0a24"
      inactive-color="#000"
      @change="onChange"
      :before-change="beforeChange"
    >
      <!-- :before-change="beforeChange" -->
      <van-tabbar-item icon="home-o"></van-tabbar-item>
      <van-tabbar-item icon="add-o"></van-tabbar-item>
      <van-tabbar-item icon="user-o"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script >
export default {
  data() {
    return {
      active: 0,
      uid: 0,
    };
  },
  mounted() {
    this.calcu();
  },
  methods: {
    calcu() {
      this.$store.commit("setBotHeight", this.$refs.btheight.height);
      // console.log(this.$refs.btheight.height);
      // console.log(this.$store.getters.getBotH + "bb");
      // console.log(this.$store.getters.getBotH + "bb");
    },
    hastoken() {
      if (localStorage.getItem("token") == null) {
        this.$root.$pop.open();
        return false;
      } else {
        return true;
      }
    },
    beforeChange(index) {
      switch (index) {
        case 0:
          return true;

          break;
        case 1:
          return this.hastoken();
          break;
        case 2:
          return this.hastoken();
          break;
        default:
          break;
      }
    },
    onChange() {
      switch (this.active) {
        case 0:
          this.$router.push("/home");
          break;
        case 1:
          //   if (localStorage.getItem("token") == null) {
          //     this.$root.$pop.open();
          //     // this.active = 0;
          //     break;
          //   }
          this.$router.push("/post");
          break;
        case 2:
          // if (localStorage.getItem("token") == null) {
          //   this.$root.$pop.open();
          // this.active = 0;
          //   break;
          // }
          this.$router.push(`/user/${this.uid}`);
          break;
        default:
          break;
      }
    },
  },
  watch: {
    $route: {
      handler(to, from) {
        // console.log(to);
        if (to.path == "/home") {
          this.active = 0;
        } else if (to.path.includes("/user/")) {
          this.active = 2;
        }
        //  else {
        //   this.active = 0;
        // }
      },
      immediate: true,
    },
  },
};
</script>