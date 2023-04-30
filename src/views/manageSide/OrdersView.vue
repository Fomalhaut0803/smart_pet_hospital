<template>
  <div class="manage">
    <el-divider content-position="left">查询条件</el-divider>
    <el-input style="width: 80%" placeholder="请输入内容" v-model="searchInfo" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option v-for="(item, key) in searchList" :key="key" :label="item.name" :value="item.value"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="findOrders()"></el-button>
    </el-input>
    <el-divider content-position="left">订单记录</el-divider>
    <el-table :data="ordersInfo" style="width: 100%">
      <el-table-column label="时间" prop="date"> </el-table-column>
      <el-table-column label="购买者" prop="purchaser"> </el-table-column>
      <el-table-column label="电话" prop="tel"> </el-table-column>
      <el-table-column label="地址" prop="address"> </el-table-column>
      <el-table-column label="清单" prop="mainfest">
        <template slot-scope="scope">
          <div v-for="item in scope.row.mainfest" :key="item._id">
            {{ item.name }} - {{ item.num }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination align="right" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'SmartPetHospitalOrdersView',

  data () {
    return {
      currentPage: 1,
      total: 0,
      pageSize: 5,
      ordersInfo: [{}],
      searchInfo: '',
      select: '',
      searchList: [{
        name: '时间',
        value: 'date'
      },
      {
        name: '购买者',
        value: 'purchaser'
      }]
    }
  },

  mounted () {
    this.getAllOrders()
  },

  methods: {
    // 获取所有订单
    getAllOrders () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allOrders, form).then((res) => {
        this.ordersInfo = res.content
        this.total = res.totalElements
      })
    },
    // 查找
    findOrders () {
      const form = {
        searchName: this.select,
        searchInfo: this.searchInfo,
        page: 1
      }
      this.$get(this.$api.url.findOrders, form).then((res) => {
        this.ordersInfo = res.data
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
</style>
