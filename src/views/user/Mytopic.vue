<template>
  <div class="contentsug">
    <div class="sugad">广告位</div>
    <div
      class="box"
      ref="box"
      v-for="(item, index) in suglist.data"
      @click="t_click(item.id)"
      :key="index"
    >
      <img
        @click="t_click(item.id)"
        class="image"
        v-lazy="`${baseurl}/${item.images[0].path}`"
        alt=""
      />
      <h1 @click="t_click(item.id)" class="title">
        {{ item.title }}
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
      $("body").css("minHeight", Math.max.apply(null, columnHeightArr));
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
    getTopic() {
      request({
        method: "post",
        url: "/user/topic",
        data: { token: localStorage.token },
        headers: {
          "content-type": "multipart/form-data",
        },
      }).then(
        (res) => {
          this.suglist = res.data;
          setTimeout(() => {
            this.water();
          }, 1000);
          if (res.data.msg.includes("登录")) {
            this.$pop.open();
          }

          // console.log(this.suglist.data[0].images[0].path);
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },

  mounted() {
    this.getTopic();
  },
};
</script>

<style lang="less">
.contentsug {
  box-sizing: border-box;
}
.sugad {
  width: 100%;
  height: 100px;
  background-color: bisque;
}
.space {
  height: 200px;
}
.box {
  float: left;
  // width: 50%;
  width: 364px;
  margin: 3px 0px 3px 6px;
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
      padding-right: 20px;
    }
  }
}
</style>