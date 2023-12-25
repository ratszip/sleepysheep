<template>
  <van-tabs
    v-model="active"
    :before-change="beforeChange"
    @click="fclick"
    sticky
  >
    <van-tab disabled></van-tab>
    <van-tab title="关注">
      <van-notice-bar
        left-icon="volume-o"
        text="帖子发布后需要审核，请耐心等待~"
      />
      <div ref="ct" class="cont">
        <homefol></homefol>
      </div>
    </van-tab>
    <van-tab title="推荐">
      <van-notice-bar
        left-icon="volume-o"
        text="帖子发布后需要审核，请耐心等待~"
      />
      <div ref="ct" class="cont">
        <homesug></homesug>
      </div>
    </van-tab>

    <van-tab disabled></van-tab>
  </van-tabs>
</template>
<script >
import homesug from "./Homewf.vue";
import homefol from "./HomeFol.vue";
export default {
  components: {
    homesug,
    homefol,
  },
  data() {
    return {
      active: 2,
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
      var fixedH = this.$store.state.bottomHeight + 40;
      ct.style.height = document.documentElement.clientHeight - fixedH + "px";
    },
    beforeChange(index) {
      if (index == 1 && localStorage.getItem("token") == null) {
        this.$root.$pop.open();
        return false;
      } else {
        return true;
      }
    },
    fclick() {
      this.$emit("switchTags", this.active);
    },
  },
};
</script>
<style lang="less">
.cont {
  width: 100%;
  overflow: scroll;
}
</style>