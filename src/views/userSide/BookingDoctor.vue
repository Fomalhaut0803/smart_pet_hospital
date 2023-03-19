<template>
    <div class="main">
        <div class="top">
            <el-input style="width: 70%" placeholder="请输入内容" v-model="searchInfo" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option v-for="(item, key) in searchList" :key="key" :label="item.name"
                        :value="item.value"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="searchInventory(select)"></el-button>
            </el-input>
        </div>
        <div>
            <el-table :data="tableData" style="width:100%">
                <el-table-column label="日期" width="150">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="宠物名字" prop="name">
                </el-table-column>
                <el-table-column label="主人" prop="price">
                </el-table-column>
                <el-table-column label="性别" prop="unit">
                </el-table-column>
                <el-table-column label="医生名" prop="num">
                </el-table-column>
                <el-table-column label="类型" prop="type">
                </el-table-column>
                <el-table-column label="治疗建议" prop="from">
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改
                    </el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </el-table-column>
            </el-table>
            <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                <el-form-item label="宠物名字">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="用户电话" prop="tel">
                    <el-input v-model="form.tel"></el-input>
                </el-form-item>
                <el-form-item label="预约时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="预约类型" prop="region">
                    <el-select v-model="form.region" placeholder="请选择预约类型">
                        <el-option label="驱虫" value="shanghai"></el-option>
                        <el-option label="注射疫苗" value="beijing"></el-option>
                        <el-option label="正常就医" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SmartPetHospitalBookingDoctor',

  data () {
    return {
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
      tableData: []
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
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
</style>
