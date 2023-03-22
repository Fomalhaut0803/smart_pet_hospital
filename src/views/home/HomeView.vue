<template>
  <div class="homeView">
    <el-carousel class="carousel">
      <el-carousel-item v-for="item in imgList" :key="item">
        <img :src="item" alt="" />
        <!-- <h3 class="small">{{ item }}</h3> -->
      </el-carousel-item>
    </el-carousel>
    <div class="banner">
      <div class="sys" @click="navTo('/doctorIndex')">医生端</div>
      <div class="sys" @click="navTo('/userIndex/bookingDoctor')">客户端</div>
      <!-- <div class="sys" @click="navTo('/manageIndex')">管理员端</div> -->
      <div class="sys" @click="linkTo('http://192.168.1.102:8082/index/inventoryManagement')">
        管理员端
      </div>
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

  .carousel {
    background: pink;
    height: 80%;
    width: 100%;

    ::v-deep .el-carousel__container {
      height: 100%;
    }
  }

  .banner {
    display: flex;
    height: 20%;

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
}
</style>
