<template>
  <div class="manage">
    <el-divider content-position="left">查询条件</el-divider>
    <el-input
      style="width: 80%"
      placeholder="请输入内容"
      v-model="searchInfo"
      class="input-with-select"
    >
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option
          v-for="(item, key) in searchList"
          :key="key"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="findSupplies()"
      ></el-button>
    </el-input>
    <el-divider content-position="left">商品列表</el-divider>
    <el-table :data="suppliesInfo" style="width: 100%">
      <el-table-column label="商品名" prop="name"> </el-table-column>
      <el-table-column label="图片" ><template slot-scope="scope">
       <img :src="scope.row.picture" width="100%">
      </template> </el-table-column>
      <el-table-column label="类型" prop="type"> </el-table-column>
      <el-table-column label="单位" prop="unit"> </el-table-column>
      <el-table-column label="库存" prop="inventoryNum"> </el-table-column>
      <el-table-column label="售出" prop="soldNum"> </el-table-column>
      <el-table-column label="进价" prop="purchasePrice"> </el-table-column>
      <el-table-column label="售价" prop="sellingPrice"> </el-table-column>
      <el-table-column label="供货商" prop="from"> </el-table-column>
      <el-table-column width="144px" align="right">
        <!-- <template slot="header">
          <div class="searchBar">
            <el-button type="primary" size="mini" @click="dialogFormVisible = true">添加</el-button>
          </div>
        </template> -->
        <template slot-scope="scope">
          <el-button size="mini" @click="openUpdate(scope.row)"
            >修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteSupplies(scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      align="right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total"
    >
    </el-pagination>

    <el-dialog title="修改商品" :visible.sync="FormVisible">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="商品名">
          <el-input v-model="suppliesDetail.name"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="upload-demo"
            action="http://192.168.43.46:8888/upload"
            :on-success="uploadImg"
            list-type="picture"
            :file-list="[]"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="suppliesDetail.type"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="suppliesDetail.unit"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="suppliesDetail.inventoryNum"></el-input>
        </el-form-item>
        <el-form-item label="进价">
          <el-input v-model="suppliesDetail.purchasePrice" disabled></el-input>
        </el-form-item>
        <el-form-item label="售价">
          <el-input v-model="suppliesDetail.sellingPrice"></el-input>
        </el-form-item>
        <el-form-item label="供货商">
          <el-input v-model="suppliesDetail.from"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="suppliesDetail.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateSupplies()">确认</el-button>
          <el-button @click="FormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SmartPetHospitalSuppliesView',

  data () {
    return {
      suppliesInfo: [{}],
      searchInfo: '',
      select: '',
      currentPage: 1,
      total: 0,
      pageSize: 8,
      type: '',
      form: {},
      suppliesDetail: {},
      FormVisible: false,
      searchList: [
        {
          name: '商品名',
          value: 'name'
        },
        {
          name: '类型',
          value: 'type'
        }
      ]
    }
  },

  mounted () {
    this.getAllSupplies()
  },

  methods: {
    // 图片上传
    uploadImg (res) {
      console.log(res)
      this.suppliesDetail.picture = res.obj.tempFileURL
    },
    // 获得全部领养列表
    getAllSupplies () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allSupplies, form).then((res) => {
        this.suppliesInfo = res.content
        this.total = res.totalElements
      })
    },
    // 查找
    findSupplies () {
      const form = {
        searchName: this.select,
        searchInfo: this.searchInfo,
        page: 1
      }
      this.$get(this.$api.url.findSupplies, form).then((res) => {
        this.suppliesInfo = res.data
        console.log(res.data)
      })
    },
    // 修改宠物领养
    openUpdate (oldSupplies) {
      this.FormVisible = true
      this.suppliesDetail = oldSupplies
    },
    updateSupplies () {
      this.$post(this.$api.url.addSupplies, this.suppliesDetail).then((res) => {
        this.FormVisible = false
        this.getAllSupplies()
        this.form = {}
      })
    },
    // 删除商品
    deleteSupplies (row) {
      console.log(row)
      this.$get(this.$api.url.deleteSupplies, { id: row._id }).then((res) => {
        this.getAllSupplies()
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
