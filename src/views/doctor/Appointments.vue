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
        <el-button type="primary" @click="findOperating()">查询</el-button>
      </div>
      <el-divider content-position="left">数据列表</el-divider>
      <div>
        <el-table :data="opInfo" style="width: 100%">
          <el-table-column label="手术室名字" prop="name"> </el-table-column>
          <el-table-column label="地址" prop="address"> </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <el-button size="mini" type="danger" @click="dialogVisible = true">预约
            </el-button>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="appointments">
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="手术时间">
            <el-date-picker v-model="form.date" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <!-- <el-time-select placeholder="起始时间" v-model="form.startTime" :picker-options="{
              start: '08:00',
              step: '01:00',
              end: '20:00'
            }">
          </el-time-select>
          <el-time-select placeholder="结束时间" v-model="form.endTime" :picker-options="{
              start: '08:00',
              step: '01:00',
              end: '20:00',
              minTime: startTime
            }">
          </el-time-select> -->

          <el-form-item label="宠物名字">
            <el-input v-model="form.petName"></el-input>
          </el-form-item>
          <el-form-item label="医生名字">
            <el-input v-model="form.doctor"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmartPetHospitalAppointmens',

  data () {
    return {
      val: '',
      dialogVisible: false,
      opInfo: [{}],
      sgform: {},
      apform: {},
      form: {
        date: '',
        startTime: '',
        endTime: '',
        petName: '',
        doctor: ''
      }
    }
  },

  mounted () {
    this.getAllOperating()
  },

  methods: {
    handleClose (done) {
      this.$confirm('关闭后不再保存,确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    // 获取所有手术室
    getAllOperating () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allOperating, form).then((res) => {
        this.opInfo = res.content
        console.log(res.content)
      })
    },
    // 查找手术室
    findOperating () {
      const form = {
        searchName: 'name',
        searchInfo: this.val,
        page: 1
      }
      this.$get(this.$api.url.findOperating, form).then((res) => {
        this.opInfo = res.data
        console.log(res.data)
      })
    },
    // 添加预约
    addSurgery () { }
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
</style>
