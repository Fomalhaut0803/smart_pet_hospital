<template>
  <div class="main">
    <el-divider content-position="left">查询条件</el-divider>
    <div class="top">
      <el-form label-position="right" label-width="120px" style="paddingright: 20px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="日期" class="minlab">
              <el-input size="small" v-model="val" placeholder="请输入日期"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="buttonBox" @click="findOrders()">
        <el-button type="primary">查询</el-button>
      </div>
    </div>
    <el-divider content-position="left">订单列表</el-divider>
    <div>
      <el-table :data="ordersInfo" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :data="props.row.mainfest">
              <el-table-column label="商品名字" prop="name"> </el-table-column>
              <el-table-column label="数量" prop="num"> </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="订单编号" prop="_id"> </el-table-column>
        <el-table-column label="日期">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteOrders(scope.row)">取消订单
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmartPetHospitalUserOrders',

  data () {
    return {
      val: '',
      ordersInfo: [],
      mainfest: [],
      orders: {
      }
    }
  },

  mounted () {
    this.getAllOrders()
  },

  methods: {
    // 获取所有订单
    getAllOrders () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allOrders, form).then((res) => {
        this.ordersInfo = res.content
        console.log(res.content)
      })
    },
    // 查找订单
    findOrders () {
      const form = {
        searchName: 'date',
        searchInfo: this.val,
        page: 1
      }
      this.$get(this.$api.url.findOrders, form).then((res) => {
        this.ordersInfo = res.data
      })
    },
    // 取消订单
    deleteOrders (row) {
      this.$post(this.$api.url.deleteOrders, row).then((res) => {
        this.ordersInfo = res.content
        this.getAllOrders()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  padding: 50px 0 0 50px;
  //   display: flex;
}

.main {
  .buttonBox {
    display: flex;
    justify-content: end;
  }
}
</style>
