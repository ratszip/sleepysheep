<template>
  <div class="content1">
    <div class="imcont" v-for="(item, index) in suglist.data">
      <div class="image">
        <img :src="baseurl + `${item.images[0]}`" alt="" />
      </div>
      <!-- <h3 class="title">{{ item.title }}</h3> -->
      <!-- <div class="info">
        <div class="uinfo">
          <img src="http://114.55.88.242:8080/images/avatar_m_c.png" />
          <span>{{ item.userName }}</span>
        </div>
        <div class="tinfo">
          <van-icon
            v-if="item.isSolved == true"
            class="solve"
            name="checked"
            color="green"
          />
          <van-icon v-else-if="item.isSolved == false" name="question-o" />
          <van-icon name="like-o" size="16" />
          <span>{{ item.likeCount }}</span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import request from "@/util/request";

export default {
  data() {
    return {
      suglist: "",
      baseurl: "http://114.55.88.242:8080/",
    };
  },
  mounted() {
    request({ url: "/index/sug" }).then(
      (res) => {
        this.suglist = res.data;
        // console.log(res.data.data[0].images[0]);
      },
      (err) => {
        console.log(err);
      }
    );
  },
};
</script>

<style lang="less">
.content1 {
  column-count: 2;
}

.imcont {
  width: 380px;
  max-height: 500px;
  margin: 5px;
  overflow: hidden;
  position: relative;
  .image {
    width: 380px;
    img {
      object-fit: contain;
    }
  }
}
</style>