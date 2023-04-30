<template>
  <div>
    <el-divider content-position="left">查询条件</el-divider>
    <el-date-picker style="width: 500px;" v-model="searchInfo" type="daterange" align="right" unlink-panels
      range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" @change="getPurchaseByTime({
          startTime: searchInfo[0],
          endTime: searchInfo[1],
          page: 1
        })">
    </el-date-picker>
    <el-divider content-position="left">进货记录</el-divider>
    <el-table :data="purchaseInfo" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.shop">
            <el-table-column label="商品名字" prop="name"> </el-table-column>
            <el-table-column label="数量" prop="num"> </el-table-column>
            <el-table-column label="供货商" prop="from"> </el-table-column>
            <el-table-column label="进价" prop="price"> </el-table-column>
            <el-table-column label="类型" prop="type"> </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column :show-tooltip-when-overflow="true" label="进货单号" prop="_id">
      </el-table-column>
      <el-table-column label="进货时间" prop="date">
        <template slot-scope="scope">
          <el-date-picker disabled style="width: 140px;" v-model="scope.row.date" type="date" placeholder="">
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column width="144px" align="right">
        <template slot="header">
          <div class="searchBar">
            <el-button type="primary" size="mini" @click="dialogFormVisible = true">添加</el-button>
          </div>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination align="right" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
    </el-pagination>

    <el-dialog title="进货单" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="时间">
          <el-input v-model="form.date"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addPurchase()">添加</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'SmartPetHospitalPurchaseView',

  data () {
    return {
      pickerOptions: {},
      searchInfo: '',
      purchaseInfo: '',
      currentPage: 1,
      total: 0,
      pageSize: 8,
      dialogFormVisible: false,
      form: {}
    }
  },

  mounted () {
    this.getAllPurchase()
  },

  methods: {
    // 获取所有进货单
    getAllPurchase () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allPurchase, form).then((res) => {
        this.purchaseInfo = res.content
        this.total = res.totalElements
      })
    },
    // 添加进货
    addPurchase () {
      this.$post(this.$api.url.addPurchase, this.form).then((res) => {
        this.dialogFormVisible = false
        this.getAllPurchase()
        this.form = {}
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

<style lang="scss" scoped></style>
