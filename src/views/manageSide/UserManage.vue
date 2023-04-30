<template>
  <div class="manage">
    <el-divider content-position="left">查询条件</el-divider>
    <el-input style="width: 80%" placeholder="请输入内容" v-model="searchInfo" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option v-for="(item, key) in searchList" :key="key" :label="item.name" :value="item.value"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="findUser()"></el-button>
    </el-input>
    <el-divider content-position="left">商品列表</el-divider>
    <el-table :data="userInfo" style="width: 100%">
      <el-table-column label="用户编号" prop="_id"> </el-table-column>
      <el-table-column label="用户昵称" prop="nickName"> </el-table-column>
      <el-table-column label="电话" prop="tel"> </el-table-column>
      <el-table-column width="144px" align="right">
        <!-- <template slot="header">
          <div class="searchBar">
            <el-button type="primary" size="mini" @click="dialogFormVisible = true">添加</el-button>
          </div>
        </template> -->
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改
          </el-button> -->
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
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
  name: 'SmartPetHospitalUserManage',

  data () {
    return {
      userInfo: [{}],
      searchInfo: '',
      select: '',
      currentPage: 1,
      total: 0,
      pageSize: 8,
      searchList: [{
        name: '昵称',
        value: 'nickName'
      },
      {
        name: '电话',
        value: 'tel'
      }]
    }
  },

  mounted () {
    this.getAllUser()
  },

  methods: {
    // 获取所有用户
    getAllUser () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allUser, form).then((res) => {
        this.userInfo = res.content
        this.total = res.totalElements
      })
    },
    // 查找
    findUser () {
      const form = {
        searchName: this.select,
        searchInfo: this.searchInfo,
        page: 1
      }
      this.$get(this.$api.url.findUser, form).then((res) => {
        this.userInfo = res.data
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
</style>
