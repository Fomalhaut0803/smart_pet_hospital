<template>
    <div>
    <el-date-picker
      style="width: 500px;"
      v-model="searchInfo"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      @change="getPurchaseByTime({
        startTime: searchInfo[0],
        endTime: searchInfo[1],
        page:1
      })"
    >
    </el-date-picker>
    <el-table
      :data="commodity"
      style="width: 100%">

      <el-table-column type="expand">
        <template slot-scope="props">
          <TableIn :tableData="props.row.shop"></TableIn>
        </template>
      </el-table-column>
      <el-table-column
        :show-tooltip-when-overflow="true"
        label="进货单号"
        prop="_id">
      </el-table-column>
      <el-table-column
        label="进货时间"
        prop="date">
        <template slot-scope="scope">
            <el-date-picker
              disabled
              style="width: 140px;"
              v-model="scope.row.date"
              type="date"
              placeholder="">
            </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column
        width="144px"
        align="right">
        <template slot="header">
          <div class="searchBar">
            <el-button type="primary" size="mini" @click="add">添加</el-button>
          </div>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
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
      :total="total">
    </el-pagination>

    <div v-if="showPopup" class="popup">
      <div class="addpopup">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="进货时间">
            <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="">
            </el-date-picker>
<!--            <el-input v-model="form.date" :disabled="type === '修改'"></el-input>-->
          </el-form-item>
          <el-form-item
          label="商品列表">
            <el-table
              :data="form.shop"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="商品名称"
                width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.name" :disabled="type === '修改'"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="num"
                label="商品数量"
                width="90">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.num"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="from"
                label="供应商">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.from" :disabled="type === '修改'"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(form)" v-if="type==='添加'" >{{ type }}</el-button>
            <el-button type="primary" @click="update(form)" v-if="type==='修改'">{{ type }}</el-button>
            <el-button type="primary" @click="addLine()" v-if="type === '添加'">插入行</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmartPetHospitalPurchaseView',

  data () {
    return {

    }
  },

  mounted () {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
