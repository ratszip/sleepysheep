<template>
  <div class="comment" v-if="pcomments">
    <div class="total">www.wendaxie.com</div>
    <div class="total">下方为评论</div>
    <div
      v-if="pcomments.comments == null && pcomments.logined"
      style="font-size: 18px; margin-top: 100px; margin-left: 40%"
    >
      暂无评论~
    </div>
    <div
      v-if="!pcomments.logined"
      style="font-size: 18px; margin-top: 100px; margin-left: 40%"
    >
      <a href="javascript:void(0)" @click="getpop">登录</a>后查看评论~
    </div>
    <div class="colist" v-if="pcomments.comments != null">
      <van-dialog v-model="showewm" v-if="curitdia" title="微信/支付宝打赏码">
        <img
          v-if="curitdia.ewm"
          style="
            width: 300px;
            height: 300px;
            margin-left: 50%;
            transform: translateX(-50%);
          "
          :src="`${baseurl}/${curitdia.ewm}`"
        />
        <div v-if="!curitdia.ewm" style="text-align: center">
          对方未提供打赏码
        </div>
      </van-dialog>
      <div
        class="citem"
        v-for="(item, index) in pcomments.comments"
        :key="index"
      >
        <van-image
          @click="goUserInfo(item.fromUid)"
          v-if="item.avatar"
          class="ctoux"
          round
          width="28px"
          height="28px"
          :src="`${baseurl}/${item.avatar}`"
        />
        <div class="comitem">
          <div class="handl">
            <span class="cuname" @click="goUserInfo(item.fromUid)">
              {{ item.nickName }}
            </span>
            <span @click="dashang(item)">答谢</span>

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
              <span class="cmore" @click="cmore(item, index)">︙</span>
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
              v-if="rindex < curRepNum"
              :ref="'rp' + rindex"
            >
              <span class="cuname" @click="goUserInfo(rp.fromUid)">
                {{ rp.fromUname }}：
              </span>
              <span class="cuname" style="color: black" v-show="rp.toUid"
                >回复 </span
              ><span
                class="cuname"
                v-show="rp.toUid"
                @click="goUserInfo(rp.toUid)"
                >{{ rp.toUname }}：</span
              >
              <span class="rpcont">{{ rp.content }}</span>
              <div>
                <span class="topictime ctime"> {{ rp.createTime }} </span>
                <span class="reply" @click="goreply(rp, index)"> 回复</span>
                <span
                  class="reply"
                  style="margin-left: 30px"
                  @click="reportRep(rp, rindex)"
                >
                  举报</span
                >
                <span class="reply" @click="deleteReply(rp, rindex)">
                  删除</span
                >
              </div>
            </div>
            <div
              class="showmore"
              v-if="item.replyList.length > curRepNum"
              @click="showmore(item, index)"
            >
              展示更多
            </div>
          </div>

          <van-divider />
        </div>
      </div>
    </div>
    <!-- <van-pagination
      class="page"
      v-model="currentPage"
      :total-items="125"
      :show-page-size="3"
      force-ellipses
    /> -->
    <div class="nomore" v-if="nomore">~暂无更多回复~</div>

    <van-action-sheet v-model="showsheet" overlay="">
      <div class="contentlist">
        <div class="rpitemls" v-for="(rp, rindex) in sheetlist" :key="rindex">
          <span class="rcuname" @click="goUserInfo(rp.fromUid)">
            {{ rp.fromUname }}:</span
          >
          <span class="rcuname" v-show="rp.toUid" style="color: black"
            >回复 </span
          ><span class="rcuname" v-show="rp.toUid" @click="goUserInfo(rp.toUid)"
            >{{ rp.toUname }}:</span
          >
          <span class="rpcontl">{{ rp.content }}</span>
          <div>
            <span class="topictime ctime"> {{ rp.createTime }} </span>
            <span class="replyl" @click="goreply(rp, curCommentIndex)">
              回复</span
            >
            <span class="replyl" @click="reportRep(rp, rindex)"> 举报</span>
            <span class="replyl" @click="deleteReply(rp, rindex)"> 删除</span>
          </div>
        </div>

        <div class="outcomment">
          <van-field
            ref="oninput"
            class="outinput"
            type="textarea"
            v-model="pubreply"
            @blur="outBlur"
            :placeholder="replyTo"
            v-show="onputshow"
          >
            <template #button>
              <van-button size="small" type="primary" @touchstart="repTouch"
                >发表</van-button
              >
            </template>
          </van-field>
        </div>
      </div>
    </van-action-sheet>
    <div class="outcomment">
      <van-field
        ref="outinput"
        class="outinput"
        type="textarea"
        v-model="pubcoment"
        placeholder="发表一下观点吧"
        v-show="!btshow && !onputshow"
        @blur="outBlur"
      >
        <template #button>
          <van-button size="small" type="primary" @touchstart="repTouch"
            >发表</van-button
          >
        </template>
      </van-field>
      <van-field
        ref="oninput"
        class="outinput"
        type="textarea"
        v-model="pubreply"
        @blur="outBlur"
        :placeholder="replyTo"
        v-show="onputshow"
      >
        <template #button>
          <van-button size="small" type="primary" @touchstart="repTouch"
            >发表</van-button
          >
        </template>
      </van-field>
    </div>
    <div class="commentBt" @click="commentBtn" v-show="btshow && !onputshow">
      <div class="zhanwei">
        <van-icon size="24" name="edit" />
        <span>发表一下观点吧</span>
      </div>
    </div>

    <van-action-sheet
      v-model="show"
      cancel-text="取消"
      :actions="actions"
      close-on-click-action
      @select="onSelect"
    >
    </van-action-sheet>
  </div>
</template>

<script >
import request from "@/util/request";
import { Dialog } from "vant";

export default {
  props: {
    pcomments: {},
  },
  data() {
    return {
      showewm: false,
      actions: [{ name: "删除" }, { name: "举报" }],
      baseurl: this.$store.state.sourceUrl,
      infoHeight: null,
      replyTo: "",
      page:1,
      show: false,
      btshow: true,
      onputshow: false,
      curitdia: null,
      curCommentIndex: null,
      pubcoment: "", //需要发表的评论
      pubreply: "", //需要发布的reply
      pubstatus: 0,
      curToUid: null, //当前要回复的对象id
      curCommentId: null, //当前comment的id
      topicId: null,
      publishType: null,
      curRepNum: 3, //展示的reply数量
      sheetlist: [],
      showsheet: false,
      lastTime: null,
      nomore: false, //没有更多评论，到底了
    };
  },
  watch: {
    pcomments: {
      handler(item1, item2) {
        let lastEle = item1.comments.slice(-1);
        this.lastTime = lastEle[0].createTime;
      },
      deep: true,
    },
    // logined: {
    //   handler(item1, item2) {
    //     if (item1 == 1) {
    //       this.loginin = 1;
    //     } else if (item1 == 0) {
    //       this.loginin = 1;
    //     }
    //   },
    //   deep: true,
    // },
  },
  methods: {
    dashang(item) {
      this.curitdia = item;
      this.showewm = true;
      console.log(this.curitdia);
      console.log(item);
    },
    loadMore() {
      this.getMoreComments();
    },
    deleteReply(rp, rindex) {
      request({
        method: "post",
        url: "/comment/deleteReply",
        data: { id: rp.id },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          if (res.data.code === 9000) {
            this.$pop.open();
          }
          if (res.data.code === 2000) {
            this.pcomments.comments[this.curCommentIndex].replyList.splice(
              rindex,
              1
            );
            console.log(this.logined);
            // console.log(
            //   this.pcomments.comments[this.curCommentIndex].replyList
            // );
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
    reportRep(rp, rindex) {
      request({
        method: "post",
        url: "/index/report",
        data: { reporterId: rp.id, type: 2 },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          if (res.data.code === 9000) {
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
    getpop() {
      this.$pop.open();
    },
    getMoreComments() {
      request({
        method: "post",
        url: "/comment/queryComments",
        data: {
          token: localStorage.token,
          topicId: this.pcomments.topicId,
          page:this.page,
          size: 10,
          createTime: this.lastTime,
        },
        headers: {
          "content-type": "multipart/form-data",
        },
      }).then(
        (res) => {
          let cursize = res.data.data.length
          if(cursize===10){
            this.page=this.page+1;
          }
          if (res.data.code === 9000) {
            this.$pop.open();
          }

          if (res.data.data === undefined) {
            this.$toast({
              message: "没有更多了",
            });
            this.nomore = true;
            return;
          }
          let arrlinshi=this.pcomments.comments.slice(-20);
          // this.pcomments.comments.push(...res.data.data);
          arrlinshi.push(...res.data.data);
          let strings = arrlinshi.map((item) => JSON.stringify(item));
          let removeDupList = [...new Set(strings)]; 
          let result = removeDupList.map((item) => JSON.parse(item));
          this.pcomments.comments=result;
          let lastEle = this.pcomments.comments.slice(-1);
          this.lastTime = lastEle[0].createTime;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    onSelect(action, index) {
      console.log(index);
      if (index === 0) {
        Dialog.confirm({
          message: "确认删除?",
        })
          .then(() => {
            this.deleteComment();
          })
          .catch(() => {
            // on cancel
          });
      } else if (index === 1) {
        Dialog.confirm({
          message: "确认举报?",
        })
          .then(() => {
            this.reportComment();
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    reportComment() {
      request({
        method: "post",
        url: "/index/report",
        data: { reporterId: this.curCommentId, type: 1 },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          if (res.data.code === 9000) {
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
    deleteComment() {
      // console.log(this.curCommentId);
      request({
        method: "post",
        url: "/comment/deleteComment",
        data: { commentId: this.curCommentId },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          if (res.data.code === 9000) {
            this.$pop.open();
          }
          if (res.data.code === 2000) {
            this.pcomments.comments.splice(this.curCommentIndex, 1);
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
    cmore(item, index) {
      this.show = true;
      this.curCommentIndex = index;
      this.curCommentId = item.id;
    },
    goUserInfo(id) {
      if (localStorage.getItem("token") == null) {
        setTimeout(() => {
          this.$pop.open();
        }, 1000);
      }
      this.$router.push(`/user/${id}`);
    },

    outBlur(e) {
      if (this.pubstatus == 0) {
        this.btshow = true;
        this.onputshow = false;
      } else {
        e.target.focus();
      }
    },
    repTouch() {
      this.pubstatus = 1;
      console;
      if (this.publishType === 0) {
        request({
          method: "post",
          url: "/comment/insertComment",
          data: {
            topicId: this.pcomments.topicId,
            content: this.pubcoment,
          },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        })
          .then(
            (res) => {
              if (res.data.code === 2000) {
                if (this.pcomments.comments === undefined) {
                  this.pcomments.comments = [];
                  this.pcomments.comments.push(res.data.data);
                } else if (this.pcomments.comments.length < 10) {
                  this.pcomments.comments.push(res.data.data);
                }
                this.pubcoment = "";
              } else if (res.data.code === 9000) {
                setTimeout(() => {
                  this.$pop.open();
                }, 1000);
              } else {
                this.$toast({
                  message: res.data.msg,
                });
              }
            },
            (err) => {
              console.log(err);
            }
          )
          .finally(() => {
            this.pubstatus = 0;
          });
      } else if (this.publishType === 1) {
        this.insertReply(1);
        this.pubreply = "";
      } else {
        this.insertReply(2);
        this.pubreply = "";
      }
      this.pubstatus = 0;
    },
    insertReply(type) {
      if (type === 1) {
        this.curToUid = null;
      }
      request({
        method: "post",
        url: "/comment/insertReply",
        data: {
          commentId: this.curCommentId,
          content: this.pubreply,
          toUid: this.curToUid,
        },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      })
        .then(
          (res) => {
            if (res.data.code === 2000) {
              if (!this.pcomments.comments[this.curCommentIndex].replyList) {
                this.$set(
                  this.pcomments.comments[this.curCommentIndex],
                  "replyList",
                  []
                );
              }
              this.pcomments.comments[this.curCommentIndex].replyList.push(
                res.data.data
              );
              this.pubreply = "";
            } else if (res.data.code === 9000) {
              setTimeout(() => {
                this.$pop.open();
              }, 1000);
            } else {
              this.$toast({
                message: res.data.msg,
              });
            }
          },
          (err) => {
            console.log(err);
          }
        )
        .finally(() => {
          this.pubstatus = 0;
        });
    },
    showmore(item, index) {
      this.showsheet = true;
      this.sheetlist = item.replyList;
      this.curCommentIndex = index;
      this.goreply(item, index);
    },
    goreply(item, index) {
      this.curCommentIndex = index;
      this.onputshow = true;
      this.btshow = true;
      if (item.nickName) {
        this.publishType = 1;
      } else {
        this.publishType = 2;
      }
      this.$nextTick(function () {
        this.$refs.oninput.focus();
      });
      this.replyTo = item.nickName ? item.nickName : item.fromUname;
      this.replyTo = "回复" + this.replyTo;
      this.curCommentId = item.commentId ? item.commentId : item.id;
      this.curToUid = item.fromUid;
    },
    commentBtn() {
      this.btshow = false;
      this.$nextTick(function () {
        this.$refs.outinput.focus();
      });
      this.publishType = 0;
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
.colist {
  margin-bottom: 20px;
}
.contentlist {
  max-height: 70%;
  padding: 25px 10px 120px;
}
.rcuname {
  font-size: 28px;
  color: gray;
}
.replyl {
  color: #a8a8a8;
  font-size: 24px;
  margin-left: 10px;
}
.rpcontl {
  font-size: 28px;
}

.outcomment {
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  height: 68px;
  // padding: 10px;
  bottom: 0;
  background-color: white;
  .outinput {
    .van-field__body {
      width: 100%;
      .van-field__control {
        width: 88%;
        // height: 60px;
        padding-left: 10px;
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
    white-space: pre-wrap;
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
