<template>
  <div class="homeView">
    <div class="top">
      <h1>嘿嘿嘿宠物医院</h1>
      <el-carousel class="carousel" trigger="click" height="500px" :interval=3000>
        <el-carousel-item v-for="item in imgList" :key="item">
          <img :src="item" alt="">
          <!-- <h3 class="small">{{ item }}</h3> -->
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="banner">
      <div class="sys" @click="navTo('/doctorIndex')">医生端</div>
      <div class="sys" @click="navTo('/userIndex/bookingDoctor')">客户端</div>
      <div class="sys" @click="navTo('/manageIndex')">管理员端</div>
      <!-- <div class="sys" @click="linkTo('http://localhost:8082/index/inventoryManagement')">
        管理员端
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgList: [
        require('../../assets/images/loginImg/cat1.png'),
        require('../../assets/images/loginImg/dog2.png'),
        require('../../assets/images/loginImg/hamster3.png'),
        require('../../assets/images/loginImg/rabbit4.png')
      ]
    }
  },
  mounted () {
    this.$get(this.$api.url.surgery, { page: 1 }).then((res) => {
      console.log(res)
    })
    // this.$post(this.$api.url.surgery, { page: 1 }).then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    // 路由跳转
    navTo (url) {
      this.$router.push(url)
    },

    // 页面跳转
    linkTo (url) {
      window.location.href = url
    }
  }
}
</script>
<style lang="scss" scoped>
.homeView {
  width: 100%;
  height: 100%;

}

.top {
  height: 80%;
  width: 100%;
  h1 {
    font-family: HarmonyOS, Arial, Helvetica, sans-serif;
    font-size: 32px;
    text-align: center;
  }
}
.carousel {
  // background: pink;
  height: 90%;
  width: 100%;

  ::v-deep .el-carousel__item {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ::v-deep .el-carousel__container {
    height: 100%;
  }
}

.banner {
  display: flex;
  height: 20%;
  padding:50px;

  .sys {
    width: 33.33%;
    border-right: 1px solid #000;
    height: 100%;
    cursor: pointer;

    &:last-child {
      border: none;
    }
  }
}
</style>
