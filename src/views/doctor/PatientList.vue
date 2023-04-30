<template>
  <div class="main patientList" @click="getAllBooking()">
    <el-divider content-position="left">查询条件</el-divider>
    <div class="top">
      <el-form label-position="right" label-width="120px" style="paddingright: 20px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="宠物名字" class="minlab">
              <el-input size="small" v-model="val" placeholder="请输入宠物名字"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="buttonBox">
      <el-button type="primary" @click="findBooking()">查询</el-button>
    </div>
    <el-divider content-position="left">数据列表</el-divider>
    <div>
      <el-table :data="tableData" style="width: 100%" @row-click="navTo">
        <el-table-column label="日期" width="150">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="宠物名字" prop="petName"> </el-table-column>
        <el-table-column label="性别" prop="sex"> </el-table-column>
        <el-table-column label="主人" prop="master"> </el-table-column>
        <el-table-column label="类型" prop="type"> </el-table-column>
        <el-table-column label="电话" prop="tel"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      val: '',
      form: {
        name: '',
        tel: '',
        region: '',
        date1: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        tel: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },
      dialogFormVisible: false,
      searchInfo: '',
      select: '',
      searchList: '',
      tableData: [{}]
    }
  },
  mounted () {
    this.getAllBooking()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    getAllBooking () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allBooking, form).then(res => {
        this.tableData = res.content
        console.log(res.content)
      })
    },
    findBooking () {
      const form = {
        searchName: 'petName',
        searchInfo: this.val,
        page: 1
      }
      this.$get(this.$api.url.findBooking, form).then((res) => {
        this.tableData = res.data
        console.log(res.data)
      })
    },
    // 路由跳转
    navTo (row) {
      this.$router.push({ name: 'Visit', params: row })
      console.log(row)
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  padding: 50px 0 0 50px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
}

.main {
  .buttonBox {
    display: flex;
    justify-content: end;
  }
}
</style>
