<template>
  <div class="home">
    <navbar v-on:switchTags="fSTag"></navbar>
    <component :is="comName"></component>
    <!-- <bottombar v-on:switchBar="fSBar"></bottombar> -->
  </div>
</template>
<script>
import navbar from "./HomeTag.vue";
import bottombar from "../BottomBar.vue";
import homesug from "@/views/home/HomeSug.vue";
import homefol from "@/views/home/HomeFol.vue";
// import request from "@/util/request";
export default {
  components: {
    navbar,
    bottombar,
    homesug,
    homefol,
  },
  data() {
    return {
      comName: homesug,
    };
  },
  methods: {
    fSTag(data) {
      switch (data) {
        case 0:
          this.comName = homefol;
          break;
        case 1:
          this.comName = homesug;
          break;
        default:
          break;
      }
    },
    fSBar(data) {},
  },
};
</script>

<style lang="less">
// .home {
//   background-color: pink;
// }
</style>