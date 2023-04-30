<template>
  <div class="manage">
    <el-divider content-position="left">查询条件</el-divider>
    <el-input style="width: 80%" placeholder="请输入内容" v-model="searchInfo" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option v-for="(item, key) in searchList" :key="key" :label="item.name" :value="item.value"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="findCases()"></el-button>
    </el-input>
    <el-divider content-position="left">看病记录</el-divider>
    <el-table :data="casesInfo" style="width: 100%">
      <el-table-column label="宠物名" prop="petName"> </el-table-column>
      <el-table-column label="主人" prop="master"> </el-table-column>
      <el-table-column label="性别" prop="sex"> </el-table-column>
      <el-table-column label="品种" prop="type"> </el-table-column>
      <el-table-column label="医生" prop="doctor"> </el-table-column>
      <el-table-column label="日期" prop="date"> </el-table-column>
      <el-table-column label="药品" prop="drug">
        <template slot-scope="scope">
          <div v-for="item in scope.row.drug" :key="item.name">
            {{ item.name }} -{{ item.num }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="description"> </el-table-column>
    </el-table>
    <el-pagination align="right" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'SmartPetHospitalCasesView',

  data () {
    return {
      casesInfo: [{}],
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
        name: '主人',
        value: 'master'
      },
      {
        name: '医生',
        value: 'doctor'
      }]
    }
  },

  mounted () {
    this.getAllCases()
  },

  methods: {
    // 获取所有手术记录
    getAllCases () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allCases, form).then((res) => {
        this.casesInfo = res.content
        this.total = res.totalElements
      })
    },
    // 查找
    findCases () {
      const form = {
        searchName: this.select,
        searchInfo: this.searchInfo,
        page: 1
      }
      this.$get(this.$api.url.findCases, form).then((res) => {
        this.casesInfo = res.data
        console.log(res.data)
      })
    },
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
