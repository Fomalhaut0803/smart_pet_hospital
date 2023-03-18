<template>
  <div class="login">
    <!-- 左边轮播图 -->
    <div class="left">
      <div class="block">
        <!-- <span class="demonstration">Click 指示器触发</span> -->
        <el-carousel trigger="click" height="500px" :interval=3000>
          <el-carousel-item v-for="item in imgList" :key="item">
            <img :src="item" alt="">
            <!-- <img src="../../assets/images/荧光夜跑/1.jpg" alt=""> -->
            <!-- <h3 class="small">{{ item }}</h3> -->
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 右边登录框 -->
    <div class="right">
      <div class="mainLogin">
        <h1>嘿嘿嘿宠物医院</h1>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm" size="small">
          <el-form-item label="账号" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">注册</el-button>
          </el-form-item>
        </el-form>

      </div>

    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      },
      imgList: [
        require('../../assets/images/loginImg/cat1.png'),
        require('../../assets/images/loginImg/dog2.png'),
        require('../../assets/images/loginImg/hamster3.png'),
        require('../../assets/images/loginImg/rabbit4.png')
      ]
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang='scss' scoped>
.login {
  width: 100%;
  height: 100%;
}

.left {
  width: 70%;
  height: 100%;
  float: left;
  // background-color: blue;

  .block {
    margin-top: 50px;
  }

  .el-carousel__item h3 {
    // color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  ::v-deep .el-carousel__item.is-animating {
    -webkit-transition: -webkit-transform 2s ease-in-out;
    transition: -webkit-transform 2s ease-in-out;
    transition: transform 2s ease-in-out;
    transition: transform 2s ease-in-out, -webkit-transform 2s ease-in-out;
  }
  ::v-deep .el-carousel__button{
    background-color:orange;
  }
}

.right {
  width: 30%;
  height: 100%;
  float: right;
  // background-color: pink;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    margin-top: 20px;
    font-family: HarmonyOS, Arial, Helvetica, sans-serif;
    font-size: 32px;
  }
}

.right .mainLogin {
  width: 280px;
  // height: 300px;
  // background-color: aqua;
}

.demo-ruleForm {
  width: 80%;
  margin: 70px auto 0;
}

.btn {
  display: flex;
  justify-content: center;

  ::v-deep .el-form-item__content {
    margin-left: 0px !important;
  }
}
</style>
