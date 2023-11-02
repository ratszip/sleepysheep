<template>
  <div class="comment" v-if="pcomments">
    <div class="total">共 {{ pcomments ? pcomments.length : 0 }} 条评论</div>
    <div class="citem" v-for="(item, index) in pcomments" :key="index">
      <van-image
        @click="goUserInfo(item.fromUid)"
        v-if="item.avatar"
        class="ctoux"
        round
        width="28px"
        height="28px"
        :src="`${baseurl}/images/${item.avatar}.png`"
      />
      <div class="comitem">
        <div class="handl">
          <span class="cuname" @click="goUserInfo(item.fromUid)">
            {{ item.nickName }}
          </span>
          <div class="zan">
            <van-icon
              style="vertical-align: -10%"
              v-if="!item.likeCom"
              name="good-job-o"
              size="18"
              @click="like(item)"
            />
            <van-icon
              style="vertical-align: -10%"
              v-if="item.likeCom"
              name="good-job"
              color="red"
              @click="unlike(item)"
              size="18"
            />
            {{ item.likeCount }}
            <span class="cmore">︙</span>
          </div>
        </div>

        <p class="ccontent">{{ item.content }}</p>
        <div>
          <span class="topictime ctime">{{ item.createTime }} </span>
          <span class="reply" @click="goreply(item, index)">回复</span>
        </div>
        <div class="replylist" v-if="item.replyList">
          <div
            class="rpitem"
            v-for="(rp, rindex) in item.replyList"
            :key="rindex"
            v-if="rindex < 1"
            :ref="'rp' + rindex"
          >
            <span class="cuname" @click="goUserInfo(rp.fromUid)">
              {{ rp.fromUname }}:</span
            >
            <span class="cuname" style="color: black" v-show="rp.toUid"
              >回复 </span
            ><span
              class="cuname"
              v-show="rp.toUid"
              @click="goUserInfo(rp.toUid)"
              >{{ rp.toUname }}:</span
            >
            <span class="rpcont">{{ rp.content }}</span>
            <div>
              <span class="topictime ctime"> {{ rp.createTime }} </span>
              <span class="reply" @click="goreply(rp, index)"> 回复</span>
            </div>
          </div>
          <div
            class="showmore"
            v-if="item.replyList.length > 1"
            @click="showmore(item, index)"
          >
            展示更多
          </div>
        </div>
        <van-divider />
      </div>
    </div>
    <div class="nomore">~暂无更多回复~</div>
    <div class="outcomment">
      <van-field
        ref="outinput"
        class="outinput"
        type="textarea"
        placeholder="发表一下观点吧"
        v-show="!btshow && !onputshow"
        @blur="outBlur"
      >
        <template #button>
          <van-button size="small" type="primary">发表</van-button>
        </template>
      </van-field>
      <van-field
        ref="oninput"
        class="outinput"
        type="textarea"
        @blur="outBlur"
        :placeholder="replyTo"
        v-show="onputshow"
      >
        <template #button>
          <van-button size="small" type="primary">发表</van-button>
        </template>
      </van-field>
    </div>
    <div class="commentBt" @click="commentBtn" v-show="btshow && !onputshow">
      <div class="zhanwei">
        <van-icon size="24" name="edit" />
        <span>发表一下观点吧</span>
      </div>
    </div>
  </div>
</template>

<script >
import request from "@/util/request";
export default {
  props: {
    pcomments: {},
  },
  data() {
    return {
      baseurl: this.$store.state.sBaseUrl,
      replyTo: "",
      inputSize: 30,
      btshow: true,
      onputshow: false,
      curCommentIndex: null,
    };
  },
  methods: {
    goUserInfo(id) {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
      }
      this.$router.push(`/user/${id}`);
    },
    outBlur() {
      this.btshow = true;
      this.onputshow = false;
    },
    showmore() {},
    goreply(item, index) {
      this.curCommentIndex = index;
      this.onputshow = true;
      this.btshow = true;
      this.$nextTick(function () {
        this.$refs.oninput.focus();
      });
      this.replyTo = item.nickName ? item.nickName : item.fromUname;
      this.replyTo = "回复" + this.replyTo;
    },
    commentBtn() {
      this.btshow = false;
      this.$nextTick(function () {
        this.$refs.outinput.focus();
      });
    },
    like(item) {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
        this.$toast({
          message: "登录过期，请重新登录",
        });
      } else {
        request({
          method: "post",
          url: "/comment/like",
          data: { commentId: item.id },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000) {
              item.likeCom = true;
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
          url: "/comment/unlike",
          data: { commentId: item.id },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000) {
              item.likeCom = false;
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
  },
};
</script>

<style lang="less">
.outcomment {
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 20px;
  bottom: 0;
  .outinput {
    .van-field__body {
      width: 100%;
      .van-field__control {
        width: 90%;
        // height: 60px;
        padding-left: 20px;
        background-color: #f0f0f0;
        border-radius: 10px;
      }
    }
  }
}
.commentBt {
  position: fixed;
  border-top: 1px solid lightgray;
  background-color: white;
  bottom: 0;
  height: 80px;
  width: 100%;
  .zhanwei {
    display: flex;
    align-items: center;
    font-size: 28px;
    color: gray;
    border-radius: 10px;
    margin: 10px 30px 10px 20px;
    height: 50px;
    background-color: rgb(247, 248, 250);
    padding-left: 30px;
  }
}
.total {
  margin-top: 2px;
  color: rgb(107, 106, 106);
  font-size: 22px;
  padding: 10px;
  background-color: white;
}
.nomore {
  text-align: center;
  font-size: 26px;
  color: lightgray;
  margin-bottom: 60px;
}
.citem {
  display: flex;
  padding: 8px 10px 8px 18px;
  flex-direction: row;
  background-color: white;
  .ctoux {
    vertical-align: middle;
  }

  .cuname {
    font-size: 24px;
    color: gray;
  }
  .ccontent {
    font-size: 26px;
    line-height: 36px;
    word-wrap: break-word;
    margin: 8px;
  }
  .ctime {
    display: inline-block;
    margin: 2px;
  }
  .comitem {
    flex: 1;
    display: flex;
    flex-direction: column;
    .handl {
      display: flex;
      font-size: 28px;
      justify-content: space-between;
      align-items: center;
      color: gray;
      margin: 8px;

      .cmore {
        margin-left: 30px;
      }
    }
  }
  .reply {
    color: #a8a8a8;
    font-size: 20px;
    margin-left: 10px;
  }
  .showmore {
    font-size: 20px;
    color: #7093db;
    margin-left: 8px;
  }
  .replylist {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    background-color: rgb(247, 248, 250);
    border-radius: 16px;
    .rpitem {
      font-size: 0;
      vertical-align: middle;
      padding: 10px;
      margin: 0;
      .rpcont {
        font-size: 24px;
      }
    }
  }
}
</style>
