<template>
    <div class="manage">
    <el-divider content-position="left">查询条件</el-divider>
    <el-input style="width: 80%" placeholder="请输入内容" v-model="searchInfo" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option v-for="(item, key) in searchList" :key="key" :label="item.name" :value="item.value"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="findSurgery()"></el-button>
    </el-input>
    <el-divider content-position="left">手术记录</el-divider>
    <el-table :data="surgeryInfo" style="width: 100%">
      <el-table-column label="宠物名" prop="petName"> </el-table-column>
      <el-table-column label="医生" prop="doctor"> </el-table-column>
      <el-table-column label="开始时间" prop="startTime"> </el-table-column>
      <el-table-column label="结束时间" prop="endTime"> </el-table-column>
      <el-table-column label="手术室" prop="operating"> </el-table-column>
      <el-table-column label="备注" prop="remark"> </el-table-column>
    </el-table>
    <el-pagination align="right" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'SmartPetHospitalSurgeryView',

  data () {
    return {
      surgeryInfo: [{}],
      searchInfo: '',
      select: '',
      currentPage: 1,
      total: 0,
      pageSize: 8,
      searchList: [{
        name: '宠物名',
        value: 'petName'
      },
      {
        name: '手术室',
        value: 'operating'
      },
      {
        name: '医生',
        value: 'doctor'
      }]
    }
  },

  mounted () {
    this.getAllSurgery()
  },

  methods: {
    // 获取所有手术记录
    getAllSurgery () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allSurgery, form).then((res) => {
        this.surgeryInfo = res.content
        this.total = res.totalElements
      })
    },
    // 查找
    findSurgery () {
      const form = {
        searchName: this.select,
        searchInfo: this.searchInfo,
        page: 1
      }
      this.$get(this.$api.url.findSurgery, form).then((res) => {
        this.surgeryInfo = res.data
        console.log(res.data)
      })
    },
    // 页面大小
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.manage {
  width: 100%;

  .searchBar {
    display: flex;
    justify-content: space-between;
  }
}

::v-deep .el-select .el-input {
  width: 140px;
}
::v-deep .el-table .el-table__cell {
  text-align: center;
}
</style>
