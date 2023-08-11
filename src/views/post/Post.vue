<template>
  <div class="post_page">
    <van-nav-bar @click-left="backClick" left-text="返回" left-arrow />
    <van-form @submit="onSubmit">
      <van-field name="uploader">
        <template #input>
          <van-uploader
            v-model="uploader"
            multiple
            :max-count="3"
            :max-size="1024 * 1024 * 5"
            :after-read="afterRead"
          />
        </template>
      </van-field>
      <van-field
        v-model="p_title"
        rows="1"
        maxlength="20"
        placeholder="请输入标题"
        show-word-limit
        required
      />

      <van-field
        v-model="p_content"
        autosize
        rows="4"
        type="textarea"
        maxlength="100"
        placeholder="添加正文"
        show-word-limit
        required
      />
      <div class="pub">
        <!-- <div class="save">
        <div class="cg">
          <van-icon class="vcg" name="envelop-o" size="18px" />
        </div>
        <span>存草稿</span>
      </div> -->
        <van-button native-type="submit" class="publish" round color="#fd3748"
          >发布内容</van-button
        >
      </div>
    </van-form>
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
  .van-field__control {
    width: 600px;
  }
}
.van-cell__value {
  display: flex;
  justify-content: space-between;
}
</style>
<script>
import request from "@/util/request";
export default {
  data() {
    return {
      p_title: "",
      p_content: "",
      uploader: [],
    };
  },
  methods: {
    afterRead() {
      //这次真是要吐槽一下vant组件 真心没有element好用
      //element 上传地址可以直接写到组件里 vant还要在方法里写上传的接口地址
      // this.uploader.forEach((item, index) => {
      //   console.log(item.file);
      // });
      // console.log(this.uploader);
    },

    backClick() {
      this.$router.back();
    },
    onSubmit() {
      this.afterRead();
      let formData = new FormData();
      this.uploader.forEach((item, index) => {
        formData.append("files", item.file);
        console.log(item.file);
      });
      // formData.append("files", this.uploader[0].file);
      formData.append("title", this.p_title);
      formData.append("content", this.p_content);
      console.log(formData);
      // console.log(localStorage.token);
      request({
        method: "post",
        url: "/index/create",
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
          token: localStorage.token,
        },
      }).then(
        (res) => {
          // res.data.token;
          if (res.data.code === 2000) {
            this.$toast({
              message: "发帖成功",
            });
            this.$router.push("/user");
          } else if (res.data.code === 3000) {
            this.$toast({
              message: res.data.msg,
            });
          }
          //
          // console.log(this.suglist.data[0].images[0].path);
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>