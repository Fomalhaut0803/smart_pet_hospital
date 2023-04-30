<template>
    <div class="top">
        <h2>嘿嘿嘿宠物医院</h2>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="topView">
            <el-breadcrumb-item :to="{ path: '/' }">登录</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>{{ title }}</el-breadcrumb-item> -->
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
  name: 'SmartPetHospitalTopView',
  props: ['title'],
  data () {
    return {
    }
  },

  methods: {

  }
}
</script>
.
<style lang="scss" scoped>
.top {
    display: flex;
    // border: 1px;
    border-bottom: 0.3px solid #b9b7b7fe;
    width: 100%;
    h2 {
        padding: 20px;
        height: 30px;
        font-size: 28px;
        font-family: 华文彩云;
        color: #83c9c7;
    }
}

.topView {
    height: 100%;
    padding: 23px;
}

.el-breadcrumb {
    font-size: 20px;
}
</style>
