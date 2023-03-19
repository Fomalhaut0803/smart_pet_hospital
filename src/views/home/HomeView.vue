<template>
<div class='homeView'>
      <el-carousel class="carousel">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  <div class="banner">
    <div class="sys">医生端</div>
    <div class="sys" @click="navTo('/userIndex/bookingDoctor')">客户端</div>
    <div class="sys">管理员端</div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    // 路由跳转
    navTo (url) {
      this.$router.push(url)
    }
  }
}
</script>
<style lang="scss" scoped>
.homeView{
  width: 100%;
  height: 100%;
  .carousel{
    background: pink;
    height: 80%;
    ::v-deep .el-carousel__container{
      height: 100%;
    }
  }
  .banner{
    display: flex;
    height: 20%;
    .sys{
      width: 33.33%;
      border-right: 1px solid #000;
      height: 100%;
      cursor: pointer;
      &:last-child{
        border:   none;
      }
    }
  }
}
</style>
