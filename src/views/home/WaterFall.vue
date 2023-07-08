<template>
  <div class="waterfall">
    <div class="topic" v-for="(item, index) in data">
      <div class="imagect">
        <img :src="baseurl + `${item.images[0]}`" alt="" />
      </div>
      <!-- <h3 class="title">{{ item.title }}</h3>
          <div class="info">
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
          </div>-->
    </div>
  </div>
</template>
<script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
  <script>
import request from "@/util/request";

export default {
  data() {
    return {
      data: [],
      baseurl: "http://114.55.88.242:8080/",
    };
  },
  mounted() {
    request({ url: "/index/sug" }).then(
      (res) => {
        this.data = res.data.data;
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
</style>