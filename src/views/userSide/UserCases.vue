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
        </div>
    </div>
</template>

<script>
export default {
  name: 'SmartPetHospitalUserCases',

  data () {
    return {
      input: '',
      searchInfo: '',
      select: '',
      searchList: [
        {
          name: '名字',
          value: 'name'
        },
        {
          name: '类型',
          value: 'type'
        },
        {
          name: '供应商',
          value: 'from'
        }
      ],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },

  mounted () {

  },

  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style lang="scss" scoped>
.mian {
    width: 100%;
    height: 100%;
}

.top {
    width: 100%;
    height: 50px;
    padding: 10px 0 0 30px;

    ::v-deep .el-input {
        width: 120px;
    }
}

// .left {
//     float: left;
// }
</style>
