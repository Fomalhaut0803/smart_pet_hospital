<template>
    <el-row class="leftView">
        <!-- <h2 class="tac">嘿嘿嘿宠物医院</h2> -->
        <el-col :span="12">
            <el-menu unique-opened default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>记录</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1" @click="navTo('/manageIndex/')">领养记录</el-menu-item>
                        <el-menu-item index="1-2" @click="navTo('/manageIndex/PurchaseView')">进货记录</el-menu-item>
                        <el-menu-item index="1-3" @click="navTo('/manageIndex/myPet')">用户购买记录</el-menu-item>
                        <el-menu-item index="1-4" @click="navTo('/manageIndex/myPet')">病历</el-menu-item>
                        <el-menu-item index="1-5" @click="navTo('/manageIndex/myPet')">手术记录</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>发布</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1" @click="jumpTo('https://channel.jd.com/pet.html')">发布领养</el-menu-item>
                        <el-menu-item index="2-2">发布商品</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-document"></i>
                        <span>库存管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1">用品库存</el-menu-item>
                        <el-menu-item index="3-2">药品库存</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-document"></i>
                        <span>人员管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="4-1">用户管理</el-menu-item>
                        <el-menu-item index="4-2">医生管理</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="5">
                    <i class="el-icon-setting"></i>
                    <span slot="title">手术室管理</span>
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
