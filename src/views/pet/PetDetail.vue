<template>
  <div class="petDetail" @click="getAllCases()">
    <h2>大黄</h2>
    <b>宠物信息</b>
    <el-divider></el-divider>
      <div class="info-box">
        <span class="title">名字： </span>
        <span class="info" prop="petName"></span>
      </div>
      <div class="info-box">
        <span class="title">年龄： </span>
        <span class="info">牛</span>
      </div>
      <div class="info-box">
        <span class="title">性别： </span>
        <span class="info">公</span>
      </div>
      <div class="info-box">
        <span class="title">类型： </span>
        <span class="info">牛</span>
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
        <el-table-column label="操作" width="200" align="center">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除
          </el-button>
        </el-table-column>
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
      tableData: []
    }
  },
  mounted () {
    this.getAllCases()
  },
  methods: {
    navTo (url) {
      this.$router.push(url)
    },
    getAllCases () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allCases, form).then(res => {
        this.tableData = res.content
        console.log(res.content)
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
