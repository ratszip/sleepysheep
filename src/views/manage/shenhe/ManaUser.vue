<template>
  <div>
    <van-search
      v-model="name"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
    <div
      class="person"
      v-if="userData"
      v-for="(item, index) in userData"
      :key="index"
    >
      <van-image
        @click="goUserInfo(item.id)"
        round
        width="60"
        height="60"
        :src="`${baseurl}/${item.avatar}`"
      />
      <div class="info">
        <span class="word"
          >{{ item.id }} ->{{ item.email }}->{{ item.nickName }}->
          {{ item.ustatus }}
        </span>
        <span class="word"> intro->{{ item.intro }} </span>
      </div>
      <div>
        <van-button type="primary" size="mini" @click="u_pass">恢复</van-button>
        <van-button type="danger" size="mini" @click="u_block"
          >拉黑账号</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import request from "@/util/request";
export default {
  data() {
    return {
      baseurl: this.$store.state.sourceUrl,
      name: "",
      userData: [],
    };
  },
  methods: {
    u_pass() {
      Dialog.confirm({
        title: "提示",
        message: "是否通过帖子",
      })
        .then(() => {
          request({
            method: "post",
            url: "/bg/setUser",
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
              } else {
                this.$toast({
                  message: res.data.msg,
                });
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
    u_block() {
      Dialog.confirm({
        title: "提示",
        message: "是否通过帖子",
      })
        .then(() => {
          request({
            method: "post",
            url: "/bg/setUser",
            data: {
              id: id,
              status: 2,
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
              } else {
                this.$toast({
                  message: res.data.msg,
                });
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

    goUserInfo(id) {
      this.$router.push(`/user/${id}`);
    },
    onSearch() {
      if (this.name.trim() == "") {
        this.$toast({
          message: "不能为空",
        });
        return;
      }
      this.search();
    },
    search() {
      request({
        method: "post",
        url: "/bg/searchUser",
        data: {
          name: this.name,
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
            this.userData = res.data.data;
          }
          if (res.data.data == undefined) {
            this.$toast({
              message: "没有数据",
            });
            return;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>

<style lang="less">
.person {
  display: flex;
}
.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 50%;
}
.word {
  font-size: 28px;
  line-height: 28px;
  word-wrap: break-word;
}
</style>