<template>
  <div class="home_follow">
    <div class="f_cell">
      <img class="tx" src="http://114.55.88.242:8080/images/avatar_m_c.png" />
      <div class="finfo">
        <span>用户123123</span>
        评论道：
        <p class="said">
          dsaf dsfaasdfsalkdjflasdlfhdshfsadfkdsofoefhweahfsdafh
          sdjsdflhsadljflksdflkjsaldjfjlsdlkfsdlkfls
          djsflksdjalfksdalkflasdfalskdfjl就好了撒旦吉萨大 立即发送大家
          爱上邓丽君发啊飒飒的案例啦
        </p>
        <div class="htopic">
          <h1 class="ftitle">
            这是我的帖子麻辣，加打了ld懒得说了解奥。拉萨机电商
          </h1>
          <div class="ftpic">
            <img src="http://114.55.88.242:8080/topic/images/5.jpg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.f_cell {
  display: flex;
  margin: 6px;
  border-radius: 3%;
  overflow: hidden;
  background-color: white;
  .htopic {
    border-radius: 3%;
    height: 200px;
    margin: 6px 0px;
    display: flex;
    // background-color: rgb(222, 214, 217);
    background-color: lightblue;
    .ftpic {
      height: 200px;
      flex: 3;
      display: flex;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .ftitle {
      flex: 1;
      padding: 6px;
      font-weight: 200;
      font-size: 24px;
      line-height: 30px;
    }
  }
}
.tx {
  vertical-align: top;
  width: 60px;
  height: 60px;
}
.finfo {
  flex: 1;
  background-color: white;
  font-size: 24px;
  font-weight: 700;
  line-height: 70px;
  padding-left: 10px;
  padding-right: 10px;
  .said {
    margin: 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 28px;
    font-weight: 400;
    line-height: normal;
    white-space: normal;
    word-break: break-all;
    -webkit-line-clamp: 6;
    text-overflow: ellipsis;
  }
}
</style>