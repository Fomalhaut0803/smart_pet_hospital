<template>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="topView">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  name: 'SmartPetHospitalTopView',
  props: ['title'],
  data () {
    return {
    }
  },

  mounted () {

  },

  methods: {

  }
}
</script>
.
<style lang="scss" scoped>
.topView{
    width: 85%;
    height: 10%;
    padding: 20px;
}
.el-breadcrumb{
    font-size: 20px;
}
</style>
