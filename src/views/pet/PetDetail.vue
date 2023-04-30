<template>
  <div class="Detail">
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
    <div><b>就诊记录</b></div>
    <el-divider></el-divider>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="宠物名字" prop="petName"> </el-table-column> -->
      <!-- <el-table-column label="性别" prop="sex"> </el-table-column> -->
      <el-table-column label="医生名" prop="doctor"> </el-table-column>
      <el-table-column label="类型" prop="type"> </el-table-column>
      <el-table-column label="治疗建议" prop="description"> </el-table-column>
    </el-table>
    <div class="bottom">
      <el-button @click="dialogFormVisible = true">修改</el-button>
      <el-button @click="navTo('/userIndex/myPet')">返回</el-button>
    </div>
    <el-dialog title="修改宠物信息" :visible.sync="dialogFormVisible" width="500px">
      <el-form ref="form" :model="form" label-width="60px">
        <el-form-item label="宠物名">
          <el-input v-model="form.petName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <!-- <el-input v-model="form.sex" disabled></el-input> -->
          <div>{{ form.sex }}</div>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addPet()">添加</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [],
      petName: '',
      petInfo: {},
      form: { sex: '' },
      dialogFormVisible: false,
      petDetail: {}
    }
  },
  mounted () {
    this.petName = this.$route.params.petName
    this.petDetail = this.$route.params
    this.form.sex = this.petDetail.sex
    this.form._id = this.petDetail._id
    console.log(this.petDetail)
    this.findPet({
      petName: this.petName
    })
    this.findCases({
      searchName: 'petName',
      searchInfo: this.petName,
      page: 1
    })
  },
  methods: {
    navTo (url) {
      this.$router.push(url)
    },
    findCases (form) {
      this.$get(this.$api.url.findCases, form).then(res => {
        this.tableData = res.data
        console.log(res.data)
      })
    },
    findPet (form) {
      console.log(form)
      this.$get(this.$api.url.findPet, {
        searchName: 'petName',
        searchInfo: form.petName,
        page: 1
      }).then(res => {
        this.petInfo = res.data[0]
        console.log(res)
      })
    },
    // 修改宠物信息
    findPetById () {
      this.$get(this.$api.url.findPet, {
        searchName: '_id',
        searchInfo: this._id,
        page: 1
      }).then(res => {
        this.petInfo = res.data[0]
        console.log(res)
      })
    },
    addPet () {
      console.log(this.$api.url.addPet)
      this.$post(this.$api.url.addPet, this.form).then((res) => {
        this.dialogFormVisible = false
        this.findPet(this.form)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.Detail {
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
