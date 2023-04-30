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
            <el-button type="primary" @click="findAdrecord()">查询</el-button>
        </div>
        <el-divider content-position="left">领养列表</el-divider>
        <div class="adRecords" :data="adRecordInfo">
            <div v-for="(item,index) in adRecordInfo" :key="item._id" class="adRecord">
                <el-card :body-style="{ padding: '0px' }">
                    <img :src="imgList[index]"
                        class="image">
                    <div style="padding: 14px;">
                        <span>{{ item.petName }}</span>
                    </div>
                </el-card>
                <div class="adRecordMessage">
                    <div class="info-box" style="margin-top: 10px;">
                        <span class="title">名字： </span>
                        <span class="info">{{ item.petName }}</span>
                    </div>
                    <div class="info-box">
                        <span class="title">年龄： </span>
                        <span class="info">{{ item.age }}</span>
                    </div>
                    <div class="info-box">
                        <span class="title">性别： </span>
                        <span class="info">{{ item.sex }}</span>
                    </div>
                    <div class="info-box">
                        <span class="title">分类： </span>
                        <span class="info">{{ item.type }}</span>
                    </div>
                    <div class="info-box">
                        <span class="title">品种： </span>
                        <span class="info">{{ item.variety }}</span>
                    </div>
                    <div class="info-box">
                        <span class="title">领养时间： </span>
                        <span class="info">{{ item.date }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SmartPetHospitalUserAdoptRecord',

  data () {
    return {
      val: '',
      adRecordInfo: [{}],
      imgList: [require('../../assets/images/loginImg/fatorangecat.webp'),
        require('../../assets/images/loginImg/sanhuacat.webp'),
        require('../../assets/images/loginImg/huazhishu.webp')]
    }
  },

  mounted () {
    this.getAllAdrecord()
  },

  methods: {
    // 获取所有宠物领养记录
    getAllAdrecord () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allAdrecord, form).then((res) => {
        this.adRecordInfo = res.content
      })
    },
    // 查找领养记录
    findAdrecord () {
      const form = {
        searchName: 'petName',
        searchInfo: this.val,
        page: 1
      }
      this.$get(this.$api.url.findAdrecord, form).then((res) => {
        this.adRecordInfo = res.data
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
.adRecords {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .adRecordMessage {
    display: none;
  }

  .adRecord {
    width: 20%;
    margin: 2.5%;
    display: flex;
    position: relative;
    img{
      width: 250px;
  height: 250px;
    }

    &:hover .adRecordMessage {
      background-color: white;
      display: inline-block;
      position: absolute;
      z-index: 99;
      top: 0;
      left: 250px;
      width: 270px;
      height: 100%;
    }

    &:hover:nth-child(4n) .adRecordMessage {
      left: -300px;
    }
  }
}

.info-box {
  margin-bottom: 30px;

  .title {
    color: #999;
  }

  .info {
    color: #333;
  }
}
</style>
