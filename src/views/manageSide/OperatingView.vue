<template>
    <div class="manage">
    <el-divider content-position="left">查询条件</el-divider>
    <el-input style="width: 80%" placeholder="请输入内容" v-model="searchInfo" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option v-for="(item, key) in searchList" :key="key" :label="item.name" :value="item.value"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="findOperating()"></el-button>
    </el-input>
    <el-divider content-position="left">商品列表</el-divider>
    <el-table :data="operatingInfo" style="width: 100%">
      <el-table-column label="手术室编号" prop="_id"> </el-table-column>
      <el-table-column label="手术室" prop="name"> </el-table-column>
      <el-table-column label="地址" prop="address"> </el-table-column>
      <el-table-column width="144px" align="right">
        <template slot="header">
          <div class="searchBar">
            <el-button type="primary" size="mini" @click="dialogFormVisible = true">添加</el-button>
          </div>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="openUpdate(scope.row)">修改
          </el-button>
          <el-button size="mini" type="danger" @click="deleteOperating(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination align="right" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
    </el-pagination>

    <el-dialog title="创建手术室" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="手术室">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addOperating()">添加</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="修改手术室" :visible.sync="FormVisible">
      <el-form label-width="100px">
        <el-form-item label="名字">
          <el-input v-model="operatingDetail.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="operatingDetail.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="udateOperating()">确认</el-button>
          <el-button @click="FormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SmartPetHospitalOperatingView',

  data () {
    return {
      operatingInfo: [{}],
      searchInfo: '',
      select: '',
      dialogFormVisible: false,
      FormVisible: false,
      currentPage: 1,
      total: 0,
      pageSize: 8,
      form: {},
      operatingDetail: {},
      searchList: [{
        name: '手术室',
        value: 'name'
      },
      {
        name: '地址',
        value: 'address'
      }]
    }
  },

  mounted () {
    this.getAllOperating()
  },

  methods: {
    // 获取所有手术室
    getAllOperating () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allOperating, form).then((res) => {
        this.operatingInfo = res.content
        this.total = res.totalElements
      })
    },
    // 查找
    findOperating () {
      const form = {
        searchName: this.select,
        searchInfo: this.searchInfo,
        page: 1
      }
      this.$get(this.$api.url.findOperating, form).then((res) => {
        this.operatingInfo = res.data
        console.log(res.data)
      })
    },
    // 添加手术室
    addOperating () {
      this.$post(this.$api.url.addOperating, this.form).then((res) => {
        this.dialogFormVisible = false
        this.getAllOperating()
        this.form = {}
      })
    },
    // 修改手术室
    openUpdate (oldOperatingr) {
      this.FormVisible = true
      this.operatingDetail = oldOperatingr
    },
    udateOperating () {
      this.$post(this.$api.url.addOperating, this.operatingDetail).then((res) => {
        this.FormVisible = false
        this.getAllOperating()
        this.form = {}
      })
    },
    // 删除手术室
    deleteOperating (row) {
      this.$get(this.$api.url.deleteOperating, { id: row._id }).then((res) => {
        this.getAllOperating()
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
