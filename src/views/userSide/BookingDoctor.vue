<template>
  <div class="main">
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
      <el-button type="primary" @click="dialogFormVisible = true">新建预约</el-button>
    </div>
    <el-divider content-position="left">预约列表</el-divider>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="日期" width="150">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="宠物名字" prop="petName"> </el-table-column>
        <el-table-column label="性别" prop="sex"> </el-table-column>
        <el-table-column label="医生名" prop="doctor"> </el-table-column>
        <el-table-column label="类型" prop="type"> </el-table-column>
        <!-- <el-table-column label="治疗建议" prop="from"> </el-table-column> -->
        <el-table-column label="操作" width="200" align="center">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >修改
          </el-button> -->
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteBooking(scope.row)">取消预约
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="新建预约" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="宠物名字">
            <el-input v-model="form.petName"></el-input>
          </el-form-item>
          <el-form-item label="宠物性别" prop="region">
            <el-select v-model="form.sex" placeholder="请选择预约类型">
              <el-option label="公" value="公"></el-option>
              <el-option label="母" value="母"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择医生" prop="region">
            <el-select v-model="form.doctor" placeholder="请选择医生" @click="findAllDoctor()">
              <el-option v-for="(item, key) in doctorList" :key="key" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户电话" prop="tel">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="预约时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date"
                value-format="yyyy-MM-dd"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="预约类型" prop="region">
            <el-select v-model="form.type" placeholder="请选择预约类型">
              <el-option label="驱虫" value="驱虫"></el-option>
              <el-option label="注射疫苗" value="注射疫苗"></el-option>
              <el-option label="正常就医" value="正常就医"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="getNewBooking">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      val: '',
      form: {},
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
      tableData: [{}],
      doctorList: [{
        name: 'wu',
        value: 'wu'
      },
      {
        name: '张三',
        value: '张三'
      },
      {
        name: '李四',
        value: '李四'
      }]
    }
  },
  mounted () {
    this.getAllBooking()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },

    // 查询预约列表
    searchBookingList () {
      this.$get(this.$api.url.findBooking).then((res) => {
        this.tableData = res.content
        console.log(res)
      })
    },

    // 获取预约列表所有
    getAllBooking () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allBooking, form).then((res) => {
        this.tableData = res.content
        console.log(res.content)
      })
    },

    // 获取预约列表
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

    // 新增预约
    getNewBooking () {
      this.$post(this.$api.url.addBooking, this.form).then((res) => {
        this.dialogFormVisible = false
        this.getAllBooking()
      })
    },

    // 取消预约
    deleteBooking (row) {
      console.log(row)
      this.$get(this.$api.url.deleteBooking, { id: row._id }).then((res) => {
        this.getAllBooking()
      })
    },
    // 获取所有医生
    findAllDoctor () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allDoctor, form).then((res) => {
        this.doctorList = res.content
        console.log('doctor' + res.content)
      })
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
