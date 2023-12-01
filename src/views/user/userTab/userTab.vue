<template>
  <van-tabs class="coll" boder v-model="active" sticky swipeable>
    <van-tab>
      <template #title>
        帖子<img
          src="../../../assets/lock.png"
          class="lock"
          v-show="userProp.topicPri"
        />
      </template>
      <div ref="aa" class="test" v-if="this.$store.state.userInfoH">
        <mytopic></mytopic>
      </div>
    </van-tab>
    <van-tab>
      <template #title>
        评论<img
          src="../../../assets/lock.png"
          class="lock"
          v-show="userProp.commentPri"
        />
      </template>
      <div ref="aa" class="test">
        <myComment></myComment>
      </div>
    </van-tab>
    <van-tab>
      <template #title>
        收藏<img
          src="../../../assets/lock.png"
          class="lock"
          v-show="userProp.collectPri"
        />
      </template>
      <div ref="aa" class="test">
        <coltopic></coltopic>
      </div>
    </van-tab>
    <van-tab>
      <template #title>
        点赞<img
          src="../../../assets/lock.png"
          class="lock"
          v-show="userProp.likePri"
        />
      </template>
      <div ref="aa" class="test">
        <myLike></myLike>
      </div>
    </van-tab>
  </van-tabs>
</template>

<script>
import mytopic from "../userTab/Mytopic.vue";
import coltopic from "../userTab/CollectTopic.vue";
import myComment from "../userTab/UserComment.vue";
import myLike from "../userTab/UserLike.vue";
export default {
  components: {
    mytopic,
    coltopic,
    myComment,
    myLike,
  },
  data() {
    return {
      active: 0,
      userProp: "",
      topic: "",
      collocet: "",
      like: "",
      comment: "",
    };
  },

  methods: {
    async setContain() {
      await this.$nextTick();
      var aa = this.$refs.aa;
      var fixedH = this.$store.state.bottomHeight + this.$store.state.userInfoH;
      aa.style.height = document.documentElement.clientHeight - fixedH + "px";
    },
  },

  mounted() {
    this.bus.$on("message", (res) => {
      this.userProp = res;
    });
    this.setContain();
  },
  updated() {
    this.setContain();
  },
};
</script>

<style lang="less">
.test {
  width: 100%;
  overflow: scroll;
}
.lock {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.coll {
  border-radius: 3%;
}
</style>