<template>
  <div class="visit">
    <h2>{{ petName }}</h2>
    <b>宠物信息</b>
    <el-divider></el-divider>
    <div class="info-box">
      <span class="title">年龄： </span>
      <span class="info">{{ petInfo.age }}</span>
    </div>
    <div class="info-box">
      <span class="title">性别： </span>
      <span class="info">{{ petInfo.sex }}</span>
    </div>
    <div class="info-box">
      <span class="title">类型： </span>
      <span class="info">{{ petInfo.type }}</span>
    </div>
    <div><b>病情描述</b></div>
    <el-divider></el-divider>
    <div class="info-box" style="width: 100%">
      <el-input type="textarea" v-model="description" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
    </div>
    <div>
      <b>用药指导</b>
      <el-button type="primary" size="small" class="fr" @click="dialogTableVisible = true">新 增</el-button>
    </div>
    <!-- <el-divider></el-divider> -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="药品名称" prop="name"> </el-table-column>
      <el-table-column label="数量" prop="num"> </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <el-button size="mini">修改
        </el-button>
        <el-button size="mini" type="danger">删除
        </el-button>
      </el-table-column>
    </el-table>
    <div class="bottom">
      <el-button @click="goBack">返回</el-button>
      <el-button @click="addCases" type="primary">提交</el-button>
    </div>

    <!-- 弹框 -->
    <el-dialog title="药品列表" :visible.sync="dialogTableVisible">
      <el-input v-model="medicineName" size="small" style="width: 180px"></el-input>
      <el-button type="primary" size="small" @click="findMedicine">搜 索</el-button>
      <el-table :data=medicineList @selection-change="selectMedicine">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column property="date" label="药品名称" prop="name"></el-table-column>
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
</template>
<script>
export default {
  data () {
    return {
      val: '',
      dialogTableVisible: false,
      gridData: [{}],
      tableData: [],
      petName: '',
      petInfo: {},
      form: {},
      medicineName: '',
      medicineList: [],
      medicineSelection: [], // 选中的药物列表
      description: '' // 病情描述
    }
  },
  mounted () {
    this.findBooking()
    this.petName = this.$route.params.petName

    this.findPet({
      searchName: 'petName',
      searchInfo: this.petName,
      page: 1
    })
  },
  methods: {
    // 添加药品
    addMedicine () {
      this.tableData.push(...this.medicineSelection)
      console.log(this.tableData)
      this.dialogTableVisible = false
    },

    // 选中药品
    selectMedicine (selection) {
      console.log(selection)
      this.medicineSelection = selection
    },

    // 返回
    goBack () {
      this.$router.go(-1)
    },
    findPet () {
      const form = {
        searchName: 'petName',
        searchInfo: this.petName,
        page: 1
      }
      this.$get(this.$api.url.findPet, form).then((res) => {
        this.petInfo = res.data[0]
        console.log(res)
      })
    },
    findBooking () {
      const form = {
        searchName: 'PetName',
        searchInfo: this.petName,
        page: 1
      }
      this.$get(this.$api.url.findBooking, form).then((res) => {
        this.bookingInfo = res.content
        console.log(res.content)
      })
    },

    // 提交
    addCases () {
      const form = { ...this.petInfo }
      form.drug = this.tableData // 用药指导
      form.description = this.description// 病情描述
      console.log('form:' + form)
      this.$post(this.$api.url.addCases, form).then((res) => {
        this.$router.go(-1) // 返回
      })
    },
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
.visit {
  width: 100%;
  padding: 20px;

  h2 {
    margin-bottom: 40px;
  }

  .info-box {
    display: inline-block;
    margin-bottom: 40px;
    width: 45%;

    .title {
      color: #999;
    }

    .info {
      color: #333;
    }
  }

  .bottom {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
}
</style>
