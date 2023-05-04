<template>
  <div class="homeView">
    <div class="top">
      <h1>嘿嘿嘿宠物医院</h1>
      <el-carousel
        class="carousel"
        trigger="click"
        height="500px"
        :interval="3000"
      >
        <el-carousel-item v-for="item in imgList" :key="item">
          <img :src="item" alt="" />
          <!-- <h3 class="small">{{ item }}</h3> -->
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="banner">
      <div class="sys" @click="navTo('/doctorIndex')">医生端</div>
      <div class="sys" @click="openLoginDialog('客户端')">客户端</div>
      <div class="sys" @click="navTo('/manageIndex')">管理员端</div>
      <!-- <div class="sys" @click="linkTo('http://localhost:8082/index/inventoryManagement')">
        管理员端
      </div> -->
    </div>
    <!-- 登录弹窗 -->
    <el-dialog
    title="登录"
      :visible.sync="loginFormVisible"
      width="40%"
    >
      <el-form label-width="80px" size="small">
        <el-form-item label="用户名">
          <el-input v-model="loginForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="loginFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">确 定</el-button>
    </div>

    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginType: '', // 登录状态 用户 管理员 医生
      loginFormVisible: false, // 是否显示登录
      loginForm: {},
      imgList: [
        require('../../assets/images/loginImg/cat1.png'),
        require('../../assets/images/loginImg/dog2.png'),
        require('../../assets/images/loginImg/hamster3.png'),
        require('../../assets/images/loginImg/rabbit4.png')
      ]
    }
  },
  mounted () {
    // this.$get(this.$api.url.surgery, { page: 1 }).then((res) => {
    //   console.log(res)
    // })
    // this.$post(this.$api.url.surgery, { page: 1 }).then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    // 打开登录弹窗
    openLoginDialog (type) {
      this.loginFormVisible = true
      // this.navTo('/userIndex/bookingDoctor')
      switch (type) {
        case '客户端':
          this.loginType = '/userIndex/bookingDoctor'
          break
      }
    },
    // 登录
    login () {
      console.log(123)
      console.log(this.$api.url.login)
      this.$get(this.$api.url.login, {
        userName: this.loginForm.userName
      }).then((res) => {
        console.log(res, 'res')
        if (!res) {
          console.log('用户不存在')
          this.$message.error('用户名都不知道，干啥吃的')
        } else if (res.password !== this.loginForm.password) {
          console.log('密码错误')
          this.$message.error('猜错了，菜狗！')
        } else {
          this.$message({
            message: '猜对了，真厉害',
            type: 'success'
          })
          sessionStorage.setItem('user', JSON.stringify(res))
          this.navTo(this.loginType)
        }
      })
    },
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
  padding: 50px;

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

::v-deep .el-dialog {
  background: url("@/assets/images/loginImg/login_bg.png");
}
</style>
