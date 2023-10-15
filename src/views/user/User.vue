<template>
  <div class="pcenter">
    <div class="pinfo">
      <div class="top">
        <van-icon class="settings" size="20px" name="setting-o" />
      </div>
      <div class="pdinfo">
        <van-image
          class="toux"
          round
          width="50px"
          height="50px"
          :src="`${this.$store.state.sBaseUrl}/images/${userInfo.avatar}.png`"
        />
        <!-- <span>namesla</span> -->
        <div class="ptext">
          <div class="pin sp"></div>
          <div class="pin name">{{ userInfo.nickName }}</div>
          <div class="pin intro">
            {{ userInfo.intro }}
          </div>
        </div>
      </div>
      <div class="bottom">
        <span class="fan">
          关注:
          <a href="javaScript:void(0); " @click="fanslist">{{
            userInfo.followCount
          }}</a>
        </span>

        <span class="fan">
          粉丝：<a href="javaScript:void(0); " @click="fanslist">{{
            userInfo.fansCount
          }}</a>
        </span>
        <!-- <van-button class="follow" size="small" round type="danger"
          >关注</van-button> -->
        <van-button
          class="follow"
          size="small"
          round
          type="info"
          plain
          @click="edit"
          >编辑</van-button
        >
      </div>
    </div>
    <van-tabs class="coll" boder v-model="active">
      <van-tab title="帖子">评论区</van-tab>
      <van-tab title="评论">发帖区</van-tab>
      <van-tab title="点赞">点赞区</van-tab>
      <van-tab title="收藏">点赞区</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import request from "@/util/request";
export default {
  data() {
    return {
      active: 0,
      userInfo: "",
    };
  },
  methods: {
    onClickBack() {
      this.$router.back();
    },
    edit() {
      this.$router.push("/edit");
    },
    fanslist() {
      this.$router.push("/fans");
      console.log("sss");
    },
  },
  mounted() {
    console.log(localStorage.token);
    request({
      method: "post",
      url: "/user/info",
      data: {
        token: localStorage.token,
      },
      headers: {
        "content-type": "multipart/form-data",
      },
    }).then(
      (res) => {
        if (res.data.code === 2000) {
          this.userInfo = res.data.data;
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
  },
};
</script>

<style lang="less">
.coll {
  border-radius: 3%;
}
.bottom {
  padding-bottom: 30px;
  .fan {
    font-size: 24px;
    margin-left: 30px;
    a {
      text-decoration: none;
      color: lightblue;
    }
  }
  .follow {
    font-size: 24px;
    margin-left: 360px;
    vertical-align: middle;
    width: 120px;
    height: 40px;
  }
}

.top {
  display: flex;
  justify-content: end;
  margin-right: 20px;
  padding-top: 15px;
}
.pinfo {
  background-color: rgb(131, 158, 199);
  color: white;
}

.pdinfo {
  padding: 10px 60px 0px 30px;
  height: 130px;
  display: flex;
  flex-direction: row;

  // span {
  //   flex: 1;
  //   font-size: 35px;
  //   vertical-align: middle;
  // }

  .ptext {
    flex: 1;
    display: flex;
    flex-flow: column;
    margin-left: 20px;
    .sp {
      overflow: hidden;
      flex: 1;
    }

    .name {
      flex: 1;
      font-size: 28px;
      font-weight: bold;
      text-overflow: ellipsis;
    }
    .intro {
      flex: 2;
      font-size: 22px;
      padding-right: 90px;
    }
    //   flex-direction: column;
    //   height: 50px;
    //   .sp {
    //     flex: 1;
    //   }
    //   .name {
    //     flex: 2;
    //     font-size: 30px;
    //   }
    //   .intro {
    //     flex: 1;
    //   }
  }
}
</style>