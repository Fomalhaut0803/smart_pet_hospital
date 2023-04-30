<template>
  <div main>
    <div class="operating">
      <el-divider content-position="left">查询条件</el-divider>
      <div class="top">
        <el-form label-position="right" label-width="120px" style="paddingright: 20px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="手术室名字" class="minlab">
                <el-input size="small" v-model="val" placeholder="手术室名字"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="buttonBox">
        <el-button type="primary" @click="findSurgery()">查询</el-button>
      </div>
      <el-divider content-position="left">数据列表</el-divider>
      <div>
        <el-table :data="sgInfo" style="width: 100%">
          <el-table-column label="宠物" prop="petName"> </el-table-column>
          <el-table-column label="手术室" prop="operating"> </el-table-column>
          <el-table-column label="医生" prop="doctor"> </el-table-column>
          <el-table-column label="开始时间" prop="startTime"> </el-table-column>
          <el-table-column label="结束时间" prop="endTime"> </el-table-column>
          <el-table-column label="药品" prop="drug">
            <template slot-scope="scope">
              <div v-for="item in scope.row.drug" :key="item.name">
                {{ item.name }} -{{ item.num }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="remark"> </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <el-button size="mini" type="danger" @click="addSurgery(form)">编辑
            </el-button>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div>
      <el-dialog :visible.sync="dialogVisible">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="宠物名">
            <el-input v-model="form.petName"></el-input>
          </el-form-item>
          <el-form-item label="手术室">
            <el-input v-model="form.operating"></el-input>
          </el-form-item>
          <el-form-item label="医生">
            <el-input v-model="form.doctor"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-input v-model="form.startTime"></el-input>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-input v-model="form.endTime"></el-input>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
          <el-table :data="medicineData" style="width: 100%">
            <el-table-column label="药品名称" prop="name"> </el-table-column>
            <el-table-column label="数量" prop="num"> </el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <el-button size="mini">修改
              </el-button>
              <el-button size="mini" type="danger">删除
              </el-button>
            </el-table-column>
          </el-table>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div>
      <el-dialog title="药品列表" :visible.sync="dialogTableVisible">
        <el-input v-model="medicineName" size="small" style="width: 180px"></el-input>
        <el-button type="primary" size="small" @click="findMedicine">搜 索</el-button>
        <el-table :data="medicineList" @selection-change="selectMedicine">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column property="date" label="药品名称" prop="name">
          </el-table-column>
          <el-table-column property="date" label="数量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.num"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <!-- <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button> -->
          <el-button type="primary" @click="addMedicine">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmartPetHospitalSurgery',

  data () {
    return {
      sgInfo: [{}],
      medicineData: [],
      val: '',
      dialogVisible: false,
      dialogTableVisible: false,
      medicineName: '',
      medicineList: [],
      medicineSelection: [], // 选中的药物列表
      form: {
        petName: ''
      }
    }
  },

  mounted () {
    this.getAllSurgery()
  },

  methods: {
    // 获取所有手术记录
    getAllSurgery () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allSurgery, form).then((res) => {
        this.sgInfo = res.content
        console.log(res.content)
      })
    },
    // 查找手术记录
    findSurgery () {
      const form = {
        searchName: 'operating',
        searchInfo: this.val,
        page: 1
      }
      this.$get(this.$api.url.findSurgery, form).then((res) => {
        this.sgInfo = res.data
        console.log(res.data)
      })
    },
    // 添加手术记录
    addSurgery (form) {
      this.$get(this.$api.url.addSurgery, form).then((res) => {
        this.medicineList = res.data
        this.dialogVisible = true
        console.log(res)
      })
    },
    // 创建
    onSubmit () {
      console.log('submit!')
    },
    // 添加药品
    addMedicine () {
      this.medicineData.push(...this.medicineSelection)
      this.dialogTableVisible = false
    },
    // 选中药品
    selectMedicine (selection) {
      console.log(selection)
      this.medicineSelection = selection
    },
    // 查找药品
    findMedicine () {
      const form = {
        searchName: 'name',
        searchInfo: this.medicineName,
        page: 1
      }
      this.$get(this.$api.url.findMedicine, form).then((res) => {
        this.medicineList = res.data
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  .buttonBox {
    display: flex;
    justify-content: end;
  }
}

::v-deep .el-table .el-table__cell {
  text-align: center;
}

::v-deep .dialog_body {
  width: 100px;
}
</style>
