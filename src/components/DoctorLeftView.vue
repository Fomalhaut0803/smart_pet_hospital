<template>
    <el-row class="leftView">
        <!-- <h2 class="tac">嘿嘿嘿宠物医院</h2> -->
        <el-col :span="12">
            <el-menu unique-opened default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <!-- <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>宠物看病</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1" @click="navTo('/doctorIndex/PatientList')">宠物病历</el-menu-item>
                        <el-menu-item index="1-2" @click="navTo('/doctorIndex/visit')">预约处理</el-menu-item>
                    </el-menu-item-group>
                </el-submenu> -->
                <el-menu-item index="1">
                    <i class="el-icon-setting"></i>
                    <span slot="title">预约处理</span>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>手术</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1" @click="jumpTo('https://channel.jd.com/pet.html')">手术预约</el-menu-item>
                        <el-menu-item index="2-2">历史手术</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'SmartPetHospitalLeftView',

  data () {
    return {

    }
  },
  methods: {
    jumpTo (url) {
      window.location.href = url
    },

    // 路由跳转
    navTo (url) {
      this.$router.push(url)
    },

    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="scss" scoped>

.leftView {
    width: 20%;
    height: 80%;
    box-sizing: border-box;
    ::v-deep .el-menu-item-group__title{
        padding: 0;
    }
}
::v-deep .el-col-12{
    height: 100%;
    width: 100%;
    .el-menu{
        height: 100%;
        .el-menu-item{
            min-width: 180px;
        }
    }
}
span{
    font-size: 18px;
}
</style>
