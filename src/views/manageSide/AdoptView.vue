<template>
  <div class="manage">
    <el-divider content-position="left">查询条件</el-divider>
    <el-input style="width: 80%" placeholder="请输入内容" v-model="searchInfo" class="input-with-select">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option v-for="(item, key) in searchList" :key="key" :label="item.name" :value="item.value"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="findAdopt()"></el-button>
    </el-input>
    <el-divider content-position="left">领养列表</el-divider>
    <el-table :data="adoptInfo" style="width: 100%">
      <el-table-column :show-tooltip-when-overflow="true" label="编号" prop="_id">
      </el-table-column>
      <el-table-column label="宠物名" prop="petName">
      </el-table-column>
            <el-table-column label="图片" ><template slot-scope="scope">
       <img :src="scope.row.picture" width="100%">
      </template> </el-table-column>
      <el-table-column label="年龄" prop="age">
      </el-table-column>
      <el-table-column label="性别" prop="sex">
      </el-table-column>
      <el-table-column label="类型" prop="type">
      </el-table-column>
      <el-table-column label="品种" prop="variety">
      </el-table-column>
      <el-table-column label="状态" prop="state">
      </el-table-column>
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
          <el-button size="mini" type="danger" @click="deleteAdopt(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination align="right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
      :page-size="pageSize" layout="total, prev, pager, next" :total="total">
    </el-pagination>

    <el-dialog title="新建领养" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="宠物名字">
          <el-input v-model="form.petName"></el-input>
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
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="公" value="公"></el-option>
            <el-option label="母" value="母"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option label="猫" value="猫"></el-option>
            <el-option label="狗" value="狗"></el-option>
            <el-option label="鼠" value="鼠"></el-option>
            <el-option label="鸟" value="鸟"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品种">
          <el-input v-model="form.variety"></el-input>
        </el-form-item>
        <el-form-item label="领养状态">
          <el-select v-model="form.state" placeholder="请选择状态">
            <el-option label="可领养" value="可领养"></el-option>
            <el-option label="不可领养" value="不可领养"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addAdopt()">添加</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="修改领养" :visible.sync="FormVisible">
      <el-form label-width="100px">
        <el-form-item label="宠物名字">
          <el-input v-model="adoptDetail.petName"></el-input>
        </el-form-item>
                <el-form-item label="图片">
          <el-upload
            class="upload-demo"
            action="http://192.168.43.46:8888/upload"
            :on-success="uploadImgUpdate"
            list-type="picture"
            :file-list="[]"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="adoptDetail.age"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="adoptDetail.sex" placeholder="请选择性别">
            <el-option label="公" value="公"></el-option>
            <el-option label="母" value="母"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="adoptDetail.type" placeholder="请选择类型">
            <el-option label="猫" value="猫"></el-option>
            <el-option label="狗" value="狗"></el-option>
            <el-option label="鼠" value="鼠"></el-option>
            <el-option label="鸟" value="鸟"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品种">
          <el-input v-model="adoptDetail.variety"></el-input>
        </el-form-item>
        <el-form-item label="领养状态">
          <el-select v-model="adoptDetail.state" placeholder="请选择状态">
            <el-option label="可领养" value="可领养"></el-option>
            <el-option label="不可领养" value="不可领养"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="udateAdopt()">确认</el-button>
          <el-button @click="FormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SmartPetHospitalAdoptView',

  data () {
    return {
      adoptInfo: [{}],
      searchInfo: '',
      select: '',
      type: '',
      form: {},
      dialogFormVisible: false,
      FormVisible: false,
      currentPage: 1,
      total: 0,
      pageSize: 8,
      adoptDetail: {},
      searchList: [{
        name: '宠物名字',
        value: 'petName'
      },
      {
        name: '类型',
        value: 'type'
      }]
    }
  },

  mounted () {
    this.getAllAdopt()
  },

  methods: {
    // 图片上传
    uploadImg (res) {
      this.form.picture = res.obj.tempFileURL
    },
    // 图片上传
    uploadImgUpdate (res) {
      this.adoptDetail.picture = res.obj.tempFileURL
    },
    // 获得全部领养列表
    getAllAdopt () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allAdopt, form).then((res) => {
        this.adoptInfo = res.content
        this.total = res.totalElements
      })
    },
    // 查找
    findAdopt () {
      const form = {
        searchName: this.select,
        searchInfo: this.searchInfo,
        page: 1
      }
      this.$get(this.$api.url.findAdopt, form).then((res) => {
        this.adoptInfo = res.data
        console.log(res.data)
      })
    },
    // 新建宠物领养
    addAdopt () {
      this.$post(this.$api.url.addAdopt, this.form).then((res) => {
        this.dialogFormVisible = false
        this.getAllAdopt()
        this.form = {}
      })
    },
    // 修改宠物领养
    openUpdate (oldAdopt) {
      this.FormVisible = true
      this.adoptDetail = oldAdopt
    },
    udateAdopt () {
      console.log()
      this.$post(this.$api.url.addAdopt, this.adoptDetail).then((res) => {
        this.FormVisible = false
        this.getAllAdopt()
        this.form = {}
      })
    },
    // 删除领养
    deleteAdopt (row) {
      console.log(row)
      this.$get(this.$api.url.deleteAdopt, { id: row._id }).then((res) => {
        this.getAllAdopt()
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
