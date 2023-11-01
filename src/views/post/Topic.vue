<template>
  <div class="topic">
    <van-nav-bar fixed>
      <template #left>
        <div class="author">
          <van-icon
            class="left"
            name="arrow-left"
            size="20"
            @click="onClickLeft"
          />
          <van-image
            @click="goInfo(tcontent.userId)"
            v-if="tcontent.avatar"
            class="toux"
            round
            style="vertical-align: 80%"
            width="28px"
            height="28px"
            :src="`${baseurl}/images/${tcontent.avatar}.png`"
          />
          <span class="auname" @click="goInfo(tcontent.userId)">{{
            tcontent.nickName
          }}</span>
        </div>
      </template>
      <template #right>
        <div class="rightgr">
          <van-button
            class="follow"
            v-show="tcontent.userId != tcontent.guestId && !tcontent.fans"
            round
            size="mini"
            type="info"
            @click="follow"
            >关注</van-button
          >
          <van-button
            v-show="tcontent.userId != tcontent.guestId && tcontent.fans"
            size="mini"
            class="follow"
            round
            type="default"
            @click="unfollow"
            >已关注</van-button
          >
          <!-- <van-icon v-show="tcontent.guest" size="16" name="share-o" /> -->

          <van-popover
            v-model="showPopover"
            trigger="click"
            :actions="actions"
            @select="onSelect"
            placement="left-start"
          >
            <template #reference>
              <van-icon
                style="margin-right: 8px"
                size="16"
                name="ellipsis"
                @click="morein"
              />
            </template>
          </van-popover>
        </div>
      </template>
    </van-nav-bar>
    <div class="imgs">
      <van-swipe class="imbg">
        <van-swipe-item
          :style="imgclass"
          ref="pics"
          v-for="(image, index) in tcontent.images"
          :key="index"
        >
          <img class="mainpic" v-lazy="`${baseurl}/${image.path}`" />
        </van-swipe-item>
      </van-swipe>

      <h1 class="title">{{ tcontent.title }}</h1>
      <p class="content">{{ tcontent.content }}</p>
      <div class="tbotom">
        <span class="topictime">发布于{{ tcontent.createTime }}</span>
        <div class="fix" v-show="!tcontent.guest">
          <span
            class="solve"
            v-if="tcontent.isSolved && tcontent.userId == tcontent.guestId"
          >
            <van-icon size="13" name="checked" style="vertical-align: -10%" />
            设为未解决</span
          >
          <span
            class="solve"
            v-else-if="
              !tcontent.isSolved && tcontent.userId == tcontent.guestId
            "
          >
            <van-icon
              size="13"
              name="question-o"
              style="vertical-align: -10%"
            />
            设为已解决
          </span>
        </div>
      </div>
    </div>
    <div class="comment" ref="refresh" v-if="comments">
      <div class="ttc">共 {{ comments ? comments.length : 0 }} 条评论</div>
      <div class="citem" v-for="(item, index) in comments" :key="index">
        <van-image
          v-if="item.avatar"
          class="ctoux"
          round
          width="28px"
          height="28px"
          :src="`${baseurl}/images/${item.avatar}.png`"
        />
        <div class="comitem">
          <div class="handl">
            <span class="cuname"> {{ item.nickName }} </span>
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
            <span class="reply" @click="goreply(item, empty[0])">回复</span>
          </div>
          <div class="replylist" v-if="item.replyList">
            <div
              class="rpitem"
              v-for="(rp, rindex) in item.replyList"
              :key="rindex"
              v-if="rindex < 1"
              :ref="'rp' + rindex"
            >
              <span class="cuname" @click="goInfo(rp.fromUid)">
                {{ rp.fromUname }}:</span
              >
              <span class="cuname" v-show="rp.toUid">回复 </span
              ><span class="cuname" v-show="rp.toUid" @click="goInfo(rp.toUid)"
                >{{ rp.toUname }}:</span
              >
              <span class="rpcont">{{ rp.content }}</span>
              <div>
                <span class="topictime ctime"> {{ rp.createTime }} </span>
                <span class="reply" @click="goreply(rp, empty[1], index)">
                  回复</span
                >
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
      <van-action-sheet v-model="showsheet">
        <div class="contentlist">
          <div
            class="rpitemls"
            v-for="(rp, rindex) in sheetlist"
            :key="rindex"
            :ref="'rp' + rindex"
          >
            <span class="rcuname" @click="goInfo(rp.fromUid)">
              {{ rp.fromUname }}:</span
            >
            <span class="rcuname" v-show="rp.toUid">回复 </span
            ><span class="rcuname" v-show="rp.toUid" @click="goInfo(rp.toUid)"
              >{{ rp.toUname }}:</span
            >
            <span class="rpcontl">{{ rp.content }}</span>
            <div>
              <span class="topictime ctime"> {{ rp.createTime }} </span>
              <span class="replyl" @click="goreply(rp, empty[2], curIndex)">
                回复</span
              >
            </div>
          </div>
          <div class="huifu">
            <van-field
              class="rep"
              type="textarea"
              :placeholder="placeholder"
              extra="发表"
              v-model="pubopinion"
              @focus="focus1"
              @blur="blur1"
              ref="input1"
              :autosize="inputSize"
            >
              <template #button>
                <van-button @click="publish" size="small" round type="primary"
                  >发表</van-button
                >
              </template>
            </van-field>
          </div>
        </div>
      </van-action-sheet>
      <div class="nomore">~暂无更多回复~</div>
    </div>

    <div class="huifu">
      <van-field
        class="rep"
        type="textarea"
        :placeholder="placeholder"
        extra="发表"
        v-model="pubopinion"
        @focus="focus"
        @blur="blur"
        ref="input"
        :autosize="inputSize"
      >
        <template #button>
          <van-button @click="publish" size="small" round type="primary"
            >发表</van-button
          >
        </template>
      </van-field>
    </div>
  </div>
</template>

<style lang="less">
// .empty{
//   display: none;
// }
.huifu{
  position: fixed;
  bottom: 0;
  width: 100%;
  .rep{
    .van-field__body{
      width: 100%;
      .van-field__control{
        width:90%;
        // height: 60px;
        padding-left: 20px;
        background-color: #F0F0F0;
        border-radius: 20px;
      }
    }
  }
}
.rightgr{
  display: flex;
  margin-top: 30px;
  align-items:center;
.follow {
      font-size: 24px;
      // vertical-align: middle;
      width: 100px;
      height: 40px;
      margin-right: 10px;
    }
    
  }
.author{
      // padding-top: 10px;
      display: flex;
      align-items:center;
      // justify-content:center;
       margin-top: 34px;
      .toux {
        margin-right: 10px;
        vertical-align: middle;
        // margin: 5px 5px 5px 10px;
        display: inline-block;
      }
      .left{
        margin-right: 10px;
      }
      .auname {
        font-size: 24px;
      }
    }

.imgs {
  background-color: white;
  margin-top: 90px;
  padding-bottom: 10px;

   
 
    .mainpic {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle,
      // object-fit: contain;
    }
    .fix{
      padding-bottom: 10px;
    }
    .solve {
    font-size: 20px;
    color: #7093DB;
    vertical-align: middle;
  }
  
  .tbotom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 16px;
  }

  .title {
    width: 100%;
    font-size: 30px;
    // height: 32px;
    // font-weight: 550;
    vertical-align: bottom;
    line-height: 30px;
    margin: 16px;
    text-overflow: ellipsis;
  }

  .content {
    font-size: 28px;
    line-height: 32px;
    word-wrap: break-word;
    margin-bottom: 10;
    padding-left: 16px;
    background-color: white;
  }
 
}

.topictime {
    // margin-left: 16px;
    margin-right: 10px;
    font-size: 20px;
    color: lightgray;
  }
  .comitem{
    flex: 1;
    display: flex;
    flex-direction: column;
    .handl{
      display: flex;
      font-size: 28px;
      justify-content: space-between;
      align-items: center;
      color: gray;
      margin: 8px;
      
      .cmore{
        margin-left: 30px;
      }
    }
    .reply{
      color: #A8A8A8;
      font-size: 20px;
      margin-left: 10px;
    }
    .replylist{
      width: 100%;
      box-sizing: border-box;
      margin: 0;
      background-color: rgb(247, 248, 250);
      border-radius: 16px;
      .rpitem{
        font-size: 0;
        vertical-align: middle;
        padding:10px;
        margin: 0;
        .rpcont{
          font-size: 24px;
        }
      
      }
      .showmore{
        font-size: 20px;
        color: #7093DB;
        margin-left: 8px;
      }
    }
  }
  .ttc{
    margin-top: 2px;
    color: rgb(107, 106, 106);
    font-size: 22px;
    padding: 10px;
    background-color: white;
  }
  .nomore{
    text-align: center;
    font-size: 26px;
    color: lightgray;
    margin-bottom: 60px;
  }
  .contentlist{
    max-height: 70%;
    padding: 25px 20px 180px;
  }
  .rcuname{
      font-size: 28px;
      color: gray;
  }
  .replyl{
      color: #A8A8A8;
      font-size: 24px;
      margin-left: 10px;
    }
    .rpcontl{
      font-size: 28px;
    }
  .citem{
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
    .ccontent{
    font-size: 26px;
    line-height: 36px;
    word-wrap: break-word;
    margin: 8px;
    }
    .ctime{
      display: inline-block;
      margin: 2px;
    }
   
  }

</style>
<script>
import request from "@/util/request";
import { Toast } from "vant";
export default {
  data() {
    return {
      showsheet: false,
      sheetlist: [],
      empty: [1, 2, 3],
      pubopinion: "",
      topicId: null,
      tcontent: "",
      comments: [],
      curCommentId: null,
      curToUid: null,
      curIndex: null,
      guest: false,
      actions: [{ text: "删帖" }, { text: "私密" }, { text: "举报" }],
      showPopover: false,
      baseurl: this.$store.state.sBaseUrl,
      placeholder: "发表一下观点吧",
      publishType: 0,
      inputSize: {
        maxHeight: 28,
        minHeight: 28,
      },
      imgclass: {
        margin: "0 auto",
        height: "",
        lineHeight: "",
        textAlign: "center",
        verticalAlign: "middle",
      },
    };
  },

  methods: {
    showmore(item, cindex) {
      // v-if="item.replyList.length > 1"
      this.showsheet = true;
      this.sheetlist = item.replyList;
      this.curIndex = cindex;
      this.goreply(item, 1, cindex);
      // console.log(this.$refs[`rp${index}`]);
    },
    goreply(item, e, cindex) {
      var name, cid, input;
      this.curIndex = cindex;
      if (e === 1) {
        name = item.nickName;
        input = this.$refs.input;
        cid = item.id;
      } else if (e === 2) {
        input = this.$refs.input;
        name = item.fromUname;
        cid = item.commentId;
      } else {
        name = item.fromUname;
        cid = item.commentId;
        input = this.$refs.input1;
        e = 2;
      }
      this.$nextTick(function () {
        this.placeholder = "回复" + name;
        this.publishType = e;
        this.curToUid = item.fromUid;
        this.curCommentId = cid;
        input.focus();
        console.log(item.fromUid + "--" + cid);
      });
    },
    onSelect(action) {
      Toast(action.text);
    },
    goInfo(id) {},
    follow() {
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
          url: "/common/follow",
          data: { userId: this.tcontent.userId },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000) {
              this.tcontent.fans = true;
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
    unfollow() {
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
          url: "/common/unfollow",
          data: { userId: this.tcontent.userId },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000) {
              this.tcontent.fans = false;
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
    onClickLeft() {
      console.log("left");
      this.$router.back();
    },
    focus() {
      this.inputSize.maxHeight = 120;
    },
    focus1() {
      this.inputSize.maxHeight = 120;
    },
    morein() {},
    blur() {
      this.placeholder = "发表一下观点吧";
      this.publishType = 0;
      this.inputSize.maxHeight = 30;
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
    // 发布评论
    publish() {
      if (this.pubopinion.trim() === "") {
        this.$toast({
          message: "不能为空",
        });
        return;
      }
      if (this.publishType === 0) {
        request({
          method: "post",
          url: "/comment/insertComment",
          data: { topicId: this.topicId, content: this.pubopinion },
          headers: {
            "content-type": "multipart/form-data",
            token: localStorage.token,
          },
        }).then(
          (res) => {
            if (res.data.code === 2000) {
              if (this.commnets === undefined) {
                this.commnets = [];
              }
              this.comments.push(res.data.data);
              this.pubopinion = "";
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
        );
      } else if (this.publishType === 1) {
        this.insertReply(1);
        this.pubopinion = "";
      } else {
        this.insertReply(2);
        this.pubopinion = "";
      }
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
          content: this.pubopinion,
          toUid: this.curToUid,
        },
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          if (res.data.code === 2000) {
            this.comments[this.curIndex].replyList.push();
            this.pubopinion = "";
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
      );
    },
    getDetail() {
      this.topicId = this.$route.params.id;
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      request({
        method: "post",
        url: "/topic/detail",
        data: { token: localStorage.token, topicId: this.topicId },
        headers: {
          "content-type": "multipart/form-data",
        },
      }).then(
        (res) => {
          Toast.clear();
          if (res.data.code === 9000) {
            this.$toast({
              message: "请先登录",
            });
          }
          this.tcontent = res.data.data;
          this.comments = res.data.data.comments;
          if (this.tcontent.userId === this.tcontent.guestId) {
            this.guest = false;
          } else {
            this.guest = true;
          }
          if (this.tcontent.images[0].height <= this.tcontent.images[0].width) {
            let realh =
              (document.body.clientWidth * this.tcontent.images[0].height) /
              this.tcontent.images[0].width;
            if (realh < 200) {
              this.imgclass.height = "200px";
            } else {
              this.imgclass.height = realh + "px";
            }
          } else {
            this.imgclass.height = "400px";
            this.imgclass.lineHeight = "400px";
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  mounted() {
    this.getDetail();
  },
};
</script>