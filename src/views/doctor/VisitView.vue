<template>
  <div class="visit">
    <h2>大黄</h2>
    <b>宠物信息</b>
    <el-divider></el-divider>
    <div class="info-box">
      <span class="title">性别： </span>
      <span class="info">公</span>
    </div>
    <div class="info-box">
      <span class="title">类型： </span>
      <span class="info">牛</span>
    </div>
    <div class="info-box">
      <span class="title">性别： </span>
      <span class="info">公</span>
    </div>
    <div class="info-box">
      <span class="title">类型： </span>
      <span class="info">牛</span>
    </div>
    <div class="info-box">
      <span class="title">性别： </span>
      <span class="info">公</span>
    </div>
    <div class="info-box">
      <span class="title">类型： </span>
      <span class="info">牛</span>
    </div>
    <div><b>病情描述</b></div>
    <el-divider></el-divider>
    <div class="info-box" style="width: 100%">
      <el-input
        type="textarea"
        v-model="val"
        :autosize="{ minRows: 4, maxRows: 6 }"
      ></el-input>
    </div>
    <div>
      <b>用药指导</b>
      <el-button
        type="primary"
        size="small"
        class="fr"
        @click="dialogTableVisible = true"
        >新 增</el-button
      >
    </div>
    <el-divider></el-divider>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="药品名称" prop="name"> </el-table-column>
      <el-table-column label="数量" prop="name"> </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >修改
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除
        </el-button>
      </el-table-column>
    </el-table>
    <div class="bottom">
      <el-button @click="goBack">返回</el-button>
      <el-button @click="goBack" type="primary">提交</el-button>
    </div>

    <!-- 弹框 -->
    <el-dialog title="药品列表" :visible.sync="dialogTableVisible">
      <el-input v-model="val" size="small" style="width: 180px"></el-input>
      <el-button type="primary" size="small">搜 索</el-button>
      <el-table :data="gridData">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column property="date" label="药品名称"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false"
          >确 定</el-button
        >
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
      tableData: []
    }
  },
  methods: {
    // 返回
    goBack () {
      this.$router.go(-1)
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
