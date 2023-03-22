<template>
  <div class="petDetail">
    <h2>{{petName}}</h2>
    <b>宠物信息</b>
    <el-divider></el-divider>
      <div class="info-box">
        <span class="title">年龄： </span>
        <span class="info">{{petInfo.age}}</span>
      </div>
      <div class="info-box">
        <span class="title">性别： </span>
        <span class="info">{{petInfo.sex}}</span>
      </div>
      <div class="info-box">
        <span class="title">类型： </span>
        <span class="info">{{petInfo.type}}</span>
      </div>
    <div><b>就诊记录</b></div>
    <el-divider></el-divider>
          <el-table :data="tableData" style="width: 100%">
        <el-table-column label="日期" width="150">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="宠物名字" prop="petName"> </el-table-column> -->
        <!-- <el-table-column label="性别" prop="sex"> </el-table-column> -->
        <el-table-column label="医生名" prop="doctor"> </el-table-column>
        <el-table-column label="类型" prop="type"> </el-table-column>
        <el-table-column label="治疗建议" prop="description"> </el-table-column>
      </el-table>
    <div class="bottom">
       <el-button @click="navTo('/userIndex/myPet')">返回</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [],
      petName: '',
      petInfo: {}
    }
  },
  mounted () {
    this.petName = this.$route.params.name
    this.findPet({
      searchName: 'name',
      searchInfo: this.petName,
      page: 1
    })
    this.findCases({
      searchName: 'petName',
      searchInfo: this.petName,
      page: 1
    })
  },
  methods: {
    navTo (url) {
      this.$router.push(url)
    },
    findCases (form) {
      this.$get(this.$api.url.findCases, form).then(res => {
        this.tableData = res.data
        console.log(res.data)
      })
    },
    findPet (form) {
      this.$get(this.$api.url.findPet, form).then(res => {
        this.petInfo = res.data[0]
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.petDetail {
  width: 100%;
  padding: 20px;
  h2 {
    margin-bottom: 40px;
  }
  .info-box{
    display: inline-block;
    margin-bottom: 40px;
    width: 45%;
    .title{
      color: #999;
    }
    .info{
      color: #333;
    }
  }
  .bottom{
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
}
</style>
