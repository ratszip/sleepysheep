<template>
  <div class="post_page">
    <van-nav-bar left-text="返回" left-arrow />
    <van-field name="uploader">
      <template #input>
        <van-uploader v-model="uploader" />
      </template>
    </van-field>
    <van-field
      v-model="p_title"
      rows="1"
      maxlength="20"
      placeholder="请输入标题"
      show-word-limit
    />

    <van-field
      v-model="p_content"
      autosize
      rows="4"
      type="textarea"
      maxlength="50"
      placeholder="添加正文"
      show-word-limit
    />
    <div class="pub">
      <div class="save">
        <div class="cg">
          <van-icon class="vcg" name="envelop-o" size="18px" />
        </div>
        <span>存草稿</span>
      </div>
      <van-button class="publish" round color="#fd3748">发布内容</van-button>
    </div>
  </div>
</template>
<style lang="less">
.pub {
  position: absolute;
  width: 100%;
  bottom: 50px;
  display: flex;
  .publish {
    flex: 1;
    margin: 10px 20px 10px 10px;
  }
  .save {
    padding-top: 6px;
    margin: 10px 10px 10px 20px;
    span {
      display: block;
      font-size: 12px;
    }
    .cg {
      margin: 0 auto;
      width: 50px;
      height: 50px;
      background-color: #dcdcdc;
      border-radius: 50%;
      .vcg {
        margin-left: 7px;
        bottom: 4px;
      }
    }
  }
}
.post_page {
  background-color: #ffff;
  height: 100%;
}
.van-cell__value {
  display: flex;
  justify-content: space-between;
}
</style>
<script>
export default {
  data() {
    return {
      p_title: "",
      p_content: "",
      uploader: [{ url: "https://img01.yzcdn.cn/vant/leaf.jpg" }],
    };
  },
};
</script>