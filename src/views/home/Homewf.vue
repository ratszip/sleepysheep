<template>
  <div class="content">
    <div class="box" ref="box" v-for="(item, index) in suglist.data">
      <img class="image" v-lazy="`${baseurl}/${item.images[0].path}`" alt="" />
      <h1 class="title">
        {{
          item.title
        }}jajdjjaljldlsjfldsajflllllljl这是用来测试的是的呀汉字中午睡觉啦
      </h1>
      <div class="info">
        <div class="uinfo" @click="gouser(item.userId)">
          <img class="tx" :src="`${baseurl}/images/${item.avatar}.png`" />
          <span>&nbsp;{{ item.nickName }}</span>
        </div>
        <div class="tinfo">
          <van-icon
            style="vertical-align: -10%"
            v-if="!item.like"
            name="like-o"
            size="16"
            @click="like(item)"
          />
          <van-icon
            style="vertical-align: -10%"
            v-if="item.like"
            name="like"
            color="red"
            @click="unlike(item)"
            size="16"
          />
          {{ item.likeCount }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/util/request";
import $ from "jquery";
export default {
  data() {
    return {
      suglist: "",
      baseurl: this.$store.state.sBaseUrl,
    };
  },
  methods: {
    water() {
      var columnHeightArr = [];
      columnHeightArr.length = 2;
      var boxArr = $(".box");
      boxArr.each(function (index, item) {
        if (index < 2) {
          columnHeightArr[index] =
            $(item).position().top + $(item).outerHeight(true);
        } else {
          var minHeight = Math.min.apply(null, columnHeightArr),
            minHeightIndex = $.inArray(minHeight, columnHeightArr);

          $(item).css({
            position: "absolute",
            top: minHeight,
            left: boxArr.eq(minHeightIndex).position().left,
          });

          columnHeightArr[minHeightIndex] += $(item).outerHeight(true);
        }
      });
    },
    gouser(id) {
      console.log(id);
    },
    like(item) {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
      } else {
        request({
          method: "post",
          url: "/topic/like",
          data: { topicId: item.id },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000) {
              item.like = true;
              item.likeCount++;
            } else if (res.data.code === 9000) {
              this.$pop.open();
            } else {
              this.$toast({
                message: res.data.msg,
              });
            }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    },
    unlike(item) {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
      } else {
        request({
          method: "post",
          url: "/topic/unlike",
          data: { topicId: item.id },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000) {
              item.like = false;
              item.likeCount--;
            } else if (res.data.code === 9000) {
              this.$pop.open();
            } else {
              this.$toast({
                message: res.data.msg,
              });
            }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    },
    t_click(id) {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
      }
      this.$router.push(`/topic/${id}`);
      // console.log(id);
    },
  },
  mounted() {
    request({
      method: "post",
      url: "/index/sug",
      data: { token: localStorage.token },
      headers: {
        "content-type": "multipart/form-data",
      },
    }).then(
      (res) => {
        this.suglist = res.data;
        if (res.data.msg.includes("登录")) {
          this.$pop.open();
        }

        // console.log(this.suglist.data[0].images[0].path);
      },
      (err) => {
        console.log(err);
      }
    );
    setTimeout(() => {
      this.water();
    }, 4000);
  },
};
</script>

<style lang="less">
.content {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.box {
  float: left;
  width: 360px;
  margin-left: 10px;
}
.image {
  width: 360px;
  max-height: 460px;
  min-height: 200px;
  object-fit: cover;
}

.title {
  font-size: small;
  width: 350px;
  height: 70px;
  line-height: 36px;
  margin: 3px 7px 5px 7px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
}

.solv {
  margin-top: 6px;
}
.info {
  display: flex;
  height: 50px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 26px;
  line-height: 50px;
  justify-content: space-between;

  .uinfo {
    vertical-align: baseline;
    .tx {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      vertical-align: text-bottom;
    }
    span {
      font-size: 20px;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 160px;
      line-height: 22px;
      display: inline-block;
      white-space: nowrap;
    }
    .tinfo {
      vertical-align: top;
    }
  }
}
</style>