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
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <!-- <span>namesla</span> -->
        <div class="ptext">
          <div class="pin sp"></div>
          <div class="pin name">用户12343214</div>
          <div class="pin intro">favor</div>
        </div>
      </div>
      <div class="bottom">
        <span class="fan"> 关注: <a>12</a> </span>
        <span class="fan"> 粉丝：<a>32</a> </span>
        <!-- <van-button class="follow" size="small" round type="danger"
          >关注</van-button> -->
        <van-button class="follow" size="small" round type="info" plain
          >编辑</van-button
        >
      </div>
    </div>
    <van-tabs class="coll" boder v-model="active">
      <van-tab title="评论">评论区</van-tab>
      <van-tab title="帖子">发帖区</van-tab>
      <van-tab title="点赞">点赞区</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    onClickBack() {
      this.$router.back();
    },
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
  }
  .follow {
    font-size: 24px;
    margin-left: 280px;
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
  padding: 10px 20px 30px 30px;
  height: 100px;
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
    .pin {
      overflow: auto;
    }
    .sp,
    .intro {
      flex: 1;
    }
    .name {
      flex: 2;
      font-size: 30px;
      font-weight: bold;
      text-overflow: ellipsis;
    }
    .intro {
      font-size: 24px;
      text-overflow: ellipsis;
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