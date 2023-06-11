<template>
  <div id="list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="list_box">
        <div
          class="list_item"
          :class="[ing % 2 == 0 ? 'even' : '']"
          v-for="(item, ing) of listDataArr"
          :key="ing"
        >
          <img :src="item.imageurel" alt="" />
          <div style="text-align: left; width: 90%; margin-left: 5%">
            {{ item.titleString }}
          </div>
          <div class="menoy">
            <span style="color: rgb(254, 168, 68)">¥{{ item.old }}起</span>
            <span
              style="
                text-decoration: line-through;
                padding-top: 5px;
                font-size: 15px;
                color: #ccc;
              "
              >¥{{ item.new }}</span
            >
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      finished: false,
      listDataArr: [
        {
          //   imageurel: require("../assets/city.png"),
          titleString: "城市天际线1号",
          old: "299",
          new: "199",
        },
        {
          //   imageurel: require("../assets/1.png"),
          titleString: "城市天际线1号",
          old: "299",
          new: "199",
        },
        {
          //   imageurel: require("../assets/2.png"),
          titleString: "城市天际线1号",
          old: "299",
          new: "199",
        },
      ],
    };
  },
  mounted() {
    // this.onLoad();
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          var listBox = this.listDataArr[0];
          this.listDataArr.push(listBox);
        }

        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.listDataArr.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
  },
};
</script>
<style lang="less">
body {
  background-color: rgb(249, 249, 249);
}

.list_box {
  column-count: 2;
  column-gap: 1em;
  width: 100%;
  margin: 0 auto;
}
.list_item {
  box-sizing: border-box;
  -webkit-column-break-inside: avoid;
  break-inside: avoid;
  text-align: center;
  max-height: 200px;
  margin-bottom: 20px;
}
.list_item img {
  width: 90%;
  height: 100px;
  border-radius: 15px 15px 15px 15px;
}
.list_item.even {
  max-height: 280px;
  margin-bottom: 20px;
}
.list_item.even img {
  width: 90%;
  height: 180px;
}
li {
  list-style: none;
}
.van-list__loading {
  clear: both;
}
.menoy {
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin-left: 5%;
}
</style>
