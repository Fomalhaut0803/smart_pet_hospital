<template>
  <div class="manage">
    <el-divider content-position="left">查询条件</el-divider>
    <el-input style="width: 80%" placeholder="请输入内容" v-model="searchInfo" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option v-for="(item, key) in searchList" :key="key" :label="item.name" :value="item.value"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="findDoctor()"></el-button>
    </el-input>
    <el-divider content-position="left">商品列表</el-divider>
    <el-table :data="doctorInfo" style="width: 100%">
      <el-table-column label="医生编号" prop="_id"> </el-table-column>
      <el-table-column label="医生名字" prop="name"> </el-table-column>
      <el-table-column label="科属" prop="genus"> </el-table-column>
      <el-table-column label="电话" prop="tel"> </el-table-column>
      <el-table-column label="密码" prop="password"> </el-table-column>
      <el-table-column width="144px" align="right">
        <template slot="header">
          <div class="searchBar">
            <el-button type="primary" size="mini" @click="dialogFormVisible = true">添加</el-button>
          </div>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="openUpdate(scope.row)">修改
          </el-button>
          <el-button size="mini" type="danger" @click="deleteDoctor(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination align="right" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
    </el-pagination>

    <el-dialog title="创建医生" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="医生名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="科属">
          <el-input v-model="form.genus"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addDoctor()">添加</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="修改医生" :visible.sync="FormVisible">
      <el-form label-width="100px">
        <el-form-item label="名字">
          <el-input v-model="doctorDetail.name"></el-input>
        </el-form-item>
        <el-form-item label="科属">
          <el-input v-model="doctorDetail.genus"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="doctorDetail.tel"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="doctorDetail.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="udateDoctor()">确认</el-button>
          <el-button @click="FormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SmartPetHospitalDoctorManage',

  data () {
    return {
      doctorInfo: [{}],
      searchInfo: '',
      select: '',
      dialogFormVisible: false,
      FormVisible: false,
      currentPage: 1,
      total: 0,
      pageSize: 8,
      form: {},
      doctorDetail: {},
      searchList: [{
        name: '医生名字',
        value: 'name'
      },
      {
        name: '科属',
        value: 'genus'
      }]
    }
  },

  mounted () {
    this.getAllDoctor()
  },

  methods: {
    // 获取所有医生
    getAllDoctor () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allDoctor, form).then((res) => {
        this.doctorInfo = res.content
        this.total = res.totalElements
      })
    },
    // 查找
    findDoctor () {
      const form = {
        searchName: this.select,
        searchInfo: this.searchInfo,
        page: 1
      }
      this.$get(this.$api.url.findDoctor, form).then((res) => {
        this.doctorInfo = res.data
        console.log(res.data)
      })
    },
    // 添加医生
    addDoctor () {
      this.$post(this.$api.url.addDoctor, this.form).then((res) => {
        this.dialogFormVisible = false
        this.getAllDoctor()
        this.form = {}
      })
    },
    // 修改医生
    openUpdate (oldDoctor) {
      this.FormVisible = true
      this.doctorDetail = oldDoctor
    },
    udateDoctor () {
      this.$post(this.$api.url.addDoctor, this.doctorDetail).then((res) => {
        this.FormVisible = false
        this.getAllDoctor()
        this.form = {}
      })
    },
    // 删除医生
    deleteDoctor (row) {
      this.$get(this.$api.url.deleteDoctor, { id: row._id }).then((res) => {
        this.getAllDoctor()
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
