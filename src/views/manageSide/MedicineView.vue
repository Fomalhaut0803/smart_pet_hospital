<template>
  <div class="manage">
    <el-divider content-position="left">查询条件</el-divider>
    <el-input style="width: 80%" placeholder="请输入内容" v-model="searchInfo" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option v-for="(item, key) in searchList" :key="key" :label="item.name" :value="item.value"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="findMedicine()"></el-button>
    </el-input>
    <el-divider content-position="left">订单记录</el-divider>
    <el-table :data="medicineInfo" style="width: 100%">
      <el-table-column label="药品名字" prop="name"> </el-table-column>
      <el-table-column label="类型" prop="type"> </el-table-column>
      <el-table-column label="库存" prop="inventoryNum"> </el-table-column>
      <el-table-column label="备注" prop="remark"> </el-table-column>
      <el-table-column label="供货商" prop="vendor"> </el-table-column>
      <el-table-column width="144px" align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="openUpdate(scope.row)">修改
          </el-button>
          <el-button size="mini" type="danger" @click="deleteMedicine(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination align="right" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
    </el-pagination>

    <el-dialog title="修改药品" :visible.sync="FormVisible">
      <el-form label-width="100px">
        <el-form-item label="药品名字">
          <el-input v-model="medicineDetail.name"></el-input>
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input v-model="medicineDetail.inventoryNum"></el-input>
        </el-form-item>
        <el-form-item label="供应商">
          <el-input v-model="medicineDetail.vendor"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="medicineDetail.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="udateVendor()">确认</el-button>
          <el-button @click="FormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SmartPetHospitalMedicineView',

  data () {
    return {
      medicineInfo: [{}],
      medicineDetail: {},
      searchInfo: '',
      select: '',
      currentPage: 1,
      total: 0,
      pageSize: 8,
      FormVisible: false,
      searchList: [{
        name: '名字',
        value: 'name'
      },
      {
        name: '供货商',
        value: 'vendor'
      }]
    }
  },

  mounted () {
    this.getAllMedicine()
  },

  methods: {
    // 获取所有订单
    getAllMedicine () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allMedicine, form).then((res) => {
        this.medicineInfo = res.content
        this.total = res.totalElements
      })
    },
    // 查找
    findMedicine () {
      const form = {
        searchName: this.select,
        searchInfo: this.searchInfo,
        page: 1
      }
      this.$get(this.$api.url.findMedicine, form).then((res) => {
        this.medicineInfo = res.data
        console.log(res.data)
      })
    },
    // 修改药品
    openUpdate (oldMedicine) {
      this.FormVisible = true
      this.medicineDetail = oldMedicine
    },
    udateVendor () {
      this.$post(this.$api.url.addMedicine, this.medicineDetail).then((res) => {
        this.FormVisible = false
        this.getAllMedicine()
        this.form = {}
      })
    },
    // 删除药品
    deleteMedicine (row) {
      this.$get(this.$api.url.deleteMedicine, { id: row._id }).then((res) => {
        this.getAllMedicine()
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
