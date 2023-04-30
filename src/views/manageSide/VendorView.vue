<template>
    <div class="manage">
    <el-divider content-position="left">查询条件</el-divider>
    <el-input style="width: 80%" placeholder="请输入内容" v-model="searchInfo" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option v-for="(item, key) in searchList" :key="key" :label="item.name" :value="item.value"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="findVendor()"></el-button>
    </el-input>
    <el-divider content-position="left">看病记录</el-divider>
    <el-table :data="vendorInfo" style="width: 100%">
      <el-table-column label="编号" prop="_id"> </el-table-column>
      <el-table-column label="进货商" prop="name"> </el-table-column>
      <el-table-column label="地址" prop="address"> </el-table-column>
      <el-table-column label="电话" prop="tel"> </el-table-column>
      <el-table-column width="144px" align="right">
        <template slot="header">
          <div class="searchBar">
            <el-button type="primary" size="mini" @click="dialogFormVisible = true">添加</el-button>
          </div>
        </template>
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="udateAdopt(scope.$index, scope.row)">修改 -->
          <el-button size="mini" @click="openUpdate(scope.row)">修改
          </el-button>
          <el-button size="mini" type="danger" @click="deleteVendor(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination align="right" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
    </el-pagination>

    <el-dialog title="新供应商" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="名字">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addVendor()">添加</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="修改供应商" :visible.sync="FormVisible">
      <el-form label-width="100px">
        <el-form-item label="名字">
          <el-input v-model="vendorDetail.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="vendorDetail.address"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="vendorDetail.tel"></el-input>
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
  name: 'SmartPetHospitalVendorView',

  data () {
    return {
      vendorInfo: [{}],
      searchInfo: '',
      select: '',
      currentPage: 1,
      total: 0,
      pageSize: 8,
      form: {},
      vendorDetail: {},
      dialogFormVisible: false,
      FormVisible: false,
      searchList: [{
        name: '名字',
        value: 'name'
      },
      {
        name: '地址',
        value: 'address'
      }]
    }
  },

  mounted () {
    this.getAllVendor()
  },

  methods: {
    // 获取所有进货商
    getAllVendor () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allVendor, form).then((res) => {
        this.vendorInfo = res.content
        this.total = res.totalElements
        console.log(res)
      })
    },
    // 查找
    findVendor () {
      const form = {
        searchName: this.select,
        searchInfo: this.searchInfo,
        page: 1
      }
      this.$get(this.$api.url.findVendor, form).then((res) => {
        this.vendorInfo = res.data
        console.log(res.data)
      })
    },
    // 新增进货商
    addVendor () {
      this.$post(this.$api.url.addVendor, this.form).then((res) => {
        this.dialogFormVisible = false
        this.getAllVendor()
        this.form = {}
      })
    },
    // 修改进货商
    openUpdate (oldVendor) {
      this.FormVisible = true
      this.vendorDetail = oldVendor
    },
    udateVendor () {
      this.$post(this.$api.url.addVendor, this.vendorDetail).then((res) => {
        this.FormVisible = false
        this.getAllVendor()
        this.form = {}
      })
    },
    // 删除供货商
    deleteVendor (row) {
      this.$get(this.$api.url.deleteVendor, { id: row._id }).then((res) => {
        this.getAllVendor()
      })
    },
    // 分页
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
