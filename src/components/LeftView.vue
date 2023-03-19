<template>
    <el-row class="leftView">
        <!-- <h2 class="tac">嘿嘿嘿宠物医院</h2> -->
        <el-col :span="12">
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>救个喵吧</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">预约一下</el-menu-item>
                        <el-menu-item index="1-2">猫猫病历</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>养个汪吧</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1">看看有啥</el-menu-item>
                        <el-menu-item index="2-2">历史领养</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-document"></i>
                        <span>宠物用品</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1">买个罐罐</el-menu-item>
                        <el-menu-item index="3-2">罐罐订单</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">改个资料</span>
                </el-menu-item>
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
