<template>
  <div class="container3">
    <div class="item3" v-for="(item, index) in commlist" :key="index">
      <div class="head3">
        <van-image
          round
          width="34px"
          height="34px"
          :src="`${baseurl}/images/${item.avatar}.png`"
        />
        <div class="info3">
          <span class="space3"></span>
          <span class="uname3">{{ item.nickName }}</span>
          <span class="time3">{{ item.createTime }}</span>
        </div>
      </div>
      <h1 class="content3">{{ item.content }}</h1>
      <div v-if="item.title" class="topic3">
        <img
          class="image3"
          v-lazy="`${baseurl}/${item.images[0].path}`"
          alt=""
        />
        <span class="title3">{{ item.title }}</span>
      </div>
      <div v-if="!item.title" class="unknow">
        <van-icon name="close" />帖子已被删除
      </div>
    </div>
  </div>
</template>
<script>
import request from "@/util/request";
import { Toast } from "vant";
export default {
  data() {
    return {
      commlist: [],
      userId: null,
      baseurl: this.$store.state.sBaseUrl,
    };
  },
  mounted() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.userId = this.$route.params.uid;
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      request({
        method: "post",
        url: "/user/comment",
        data: { userId: this.userId },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      })
        .then(
          (res) => {
            Toast.clear();
            this.commlist = res.data.data;
            if (res.data.msg.includes("登录")) {
              this.$pop.open();
            }
            // console.log(this.mylist2);
          },
          (err) => {
            console.log(err);
          }
        )
        .finally(() => {
          Toast.clear();
        });
    },
  },
};
</script>

<style lang="less">
.container3 {
  box-sizing: border-box;
  margin-bottom: 20px;
}
.item3 {
  background-color: white;
  margin: 4px 6px;
  padding: 0px 10px 4px;
  border-radius: 10px;
}
.head3 {
  display: flex;
  padding: 4px 0px;
  .info3 {
    display: flex;
    flex-direction: column;
    margin-left: 6px;
  }
  .space3 {
    height: 8px;
  }
  .time3 {
    font-size: 20px;
    color: gray;
  }
}

.uname3 {
  font-size: 24px;
  flex: 1;
}
.content3 {
  font-size: 26px;
  margin-bottom: 10px;
  margin-top: 8px;
  font-weight: normal;
}
.topic3 {
  display: flex;
  background-color: rgb(247, 248, 250);
  align-items: center;
  .title3 {
    margin: 0 10px;
    font-size: 28px;
  }
  .image3 {
    background-color: white;
    border: 2px solid lightblue;
    width: 200px;
    max-height: 200px;
    min-height: 140px;
    overflow: hidden;
    object-fit: contain;
  }
}
.unknow {
  font-size: 30px;
  line-height: 60px;
  text-align: center;
  height: 60px;
  background-color: rgb(247, 248, 250);
}
</style>