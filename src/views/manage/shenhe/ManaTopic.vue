<template>
  <!-- <van-pull-refresh v-model="isloading" @refresh="onRefresh" v-if="topics"> -->
  <scroller
    style="top: 50px"
    :on-refresh="onRefresh"
    :on-infinite="infinite"
    ref="myscroller"
  >
    <waterfall
      class="contentmana"
      :height="rqh"
      :data="topics"
      :loadDistance="150"
    >
      <!-- <div class="sugad">banner</div> -->
      <div class="box" ref="box" v-for="(item, index) in topics" :key="index">
        <img
          class="image"
          :lazy-src="`${baseurl}/${item.images[0].path}`"
          alt=""
        />
        <span style="font-weight: bolder" class="title">
          {{ item.title }}
        </span>
        <span class="title">{{ item.content }}</span>
        <div>
          <van-button
            type="primary"
            size="small"
            @click="t_pass(index, item.id)"
            >通过</van-button
          >
          <van-button type="danger" size="small" @click="t_delete(item.id)"
            >不通过</van-button
          >
        </div>
      </div>
    </waterfall>
  </scroller>
</template>

<script>
import request from "@/util/request";
import { Toast } from "vant";
import { Dialog } from "vant";
export default {
  data() {
    return {
      isloading: true,
      rqh: null,
      topics: [],
      lastTime: null,
      baseurl: this.$store.state.sourceUrl,
    };
  },
  mounted() {
    this.$refs.myscroller.finishInfinite(true);
    this.getData();
  },
  methods: {
    infinite(done) {
      this.loadmore();
    },
    t_pass(index, id) {
      Dialog.confirm({
        title: "提示",
        message: "是否通过帖子",
      })
        .then(() => {
          request({
            method: "post",
            url: "/bg/setTopic",
            data: {
              id: id,
              status: 1,
            },
            headers: {
              "content-type": "multipart/form-data",
            },
          }).then(
            (res) => {
              if (res.data.code === 6000) {
                this.$toast({
                  message: "访问过于频繁，稍后再试",
                });
                return;
              } else if (res.data.code === 2000) {
                this.topics.splice(index, 1);
              }
              if (res.data.data == undefined) {
                this.$toast({
                  message: "没有更多了~",
                });
                return;
              }
            },
            (err) => {
              console.log(err);
            }
          );
        })
        .catch(() => {
          // on cancel
        });
    },
    t_delete(id) {
      Dialog.confirm({
        title: "删除警告",
        message: "是否删除帖子，不可恢复",
      })
        .then(() => {
          // on confirm
          request({
            method: "post",
            url: "/bg/delete",
            data: { id: id },
            headers: {
              "content-type": "multipart/form-data",
            },
          }).then(
            (res) => {
              if (res.data.code === 2000) {
                this.topics.splice(index, 1);
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
        })
        .catch(() => {
          // on cancel
        });
    },
    loadmore() {
      request({
        method: "post",
        url: "/bg/topic",
        data: {
          size: 10,
          createTime: this.lastTime,
        },
      }).then(
        (res) => {
          this.$refs.myscroller.finishInfinite(true);
          if (res.data.code === 6000) {
            this.$toast({
              message: "访问过于频繁，稍后再试",
            });
            return;
          }
          if (res.data.data == undefined) {
            this.$toast({
              message: "没有更多了~",
            });
            return;
          }
          this.topics.push(...res.data.data);
          // console.log(this.topics);
          let lastEle = this.topics.slice(-1);
          this.lastTime = lastEle[0].createTime;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    onRefresh() {
      this.lastTime = null;
      this.getData();
    },
    getData() {
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      request({
        method: "post",
        url: "/bg/topic",
        data: { size: 10 },
        headers: {
          "content-type": "multipart/form-data",
        },
      })
        .then(
          (res) => {
            this.topics = res.data.data;
            let lastEle = this.topics.slice(-1);
            this.lastTime = lastEle[0].createTime;
            this.$refs.myscroller.finishPullToRefresh();
            if (res.data.code === 9000) {
              this.$pop.open();
            }
          },
          (err) => {
            console.log(err);
          }
        )
        .finally(() => {
          Toast.clear();
          this.isloading = false;
        });
    },
  },
};
</script>

<style lang="less">
.contentmana {
  box-sizing: border-box;
  padding-bottom: 70px;
}
.sugad {
  width: 100%;
  height: 300px;
  background-color: bisque;
}
// .space {
//   height: 200px;
// }
.box {
  // float: left;
  // position: absolute;
  // width: 50%;
  margin-top: 6px;
  background-color: white;
}
.image {
  width: 100%;
  max-height: 480px;
  min-height: 200px;
  overflow: hidden;
  object-fit: cover;
}

.title {
  font-size: small;
  width: 350px;
  // height: 70px;

  line-height: 36px;
  margin: 3px 7px 5px 7px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
}

// .infom {
//   display: flex;
//   height: 50px;
//   margin-left: 10px;
//   margin-right: 10px;
//   font-size: 26px;
//   line-height: 50px;
//   justify-content: space-between;

//   .uinfo {
//     vertical-align: baseline;
//     .tx {
//       width: 32px;
//       height: 32px;
//       border-radius: 50%;
//       vertical-align: text-bottom;
//     }
//     span {
//       font-size: 20px;
//       text-overflow: ellipsis;
//       overflow: hidden;
//       width: 160px;
//       line-height: 22px;
//       display: inline-block;
//       white-space: nowrap;
//     }
//     .tinfo {
//       vertical-align: top;
//       padding-right: 20px;
//     }
//   }
// }
</style>