<template>
    <el-row class="leftView">
        <!-- <h2 class="tac">嘿嘿嘿宠物医院</h2> -->
        <el-col :span="12">
            <el-menu unique-opened default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen"
                @close="handleClose">
                <el-menu-item index="0" @click="navTo('/userIndex/Recommend')">
                    <i class="el-icon-menu"></i>
                    <span slot="title">推荐</span>
                </el-menu-item>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>救个喵吧</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1" @click="navTo('/userIndex/bookingDoctor')">预约一下</el-menu-item>
                        <el-menu-item index="1-2" @click="navTo('/userIndex/myPet')">猫猫档案</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>养个汪吧</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1" @click="navTo('/userIndex/userAdopt')">看看有啥</el-menu-item>
                        <el-menu-item index="2-2" @click="navTo('/userIndex/userAdoptRecord')">历史领养</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-document"></i>
                        <span>宠物用品</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1" @click="navTo('/userIndex/userSupplies')">买个罐罐</el-menu-item>
                        <el-menu-item index="3-2" @click="navTo('/userIndex/userOrders')">罐罐订单</el-menu-item>
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

    ::v-deep .el-menu-item-group__title {
        padding: 0;
    }
}

::v-deep .el-col-12 {
    height: 100%;
    width: 100%;

    .el-menu {
        height: 100%;

        .el-menu-item {
            min-width: 180px;
        }
    }
}

span {
    font-size: 18px;
}</style>
