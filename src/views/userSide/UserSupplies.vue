<template>
  <div class="main">
    <el-badge :value="12" class="item fr">
    <i class="el-icon-shopping-cart-2"></i>
    </el-badge>
    <el-divider content-position="left">查询条件</el-divider>
    <div class="block">
      <el-form label-position="right" label-width="120px" style="paddingright: 20px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="名字" class="minlab">
              <el-input size="small" v-model="val" placeholder="请输入商品名字"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="buttonBox">
        <el-button type="primary" @click="findSupplies()">查询</el-button>
      </div>
    </div>
    <el-divider content-position="left">商品详情</el-divider>
    <div class="shops">
      <div v-for="(item,index) in shopInfo" :key="item._id" class="shop">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="imgList[index]"
            class="image">
          <div style="padding: 14px;">
            <div class="fr">
              <span style="margin-left: 60px;">￥</span>
              <span style="color: red;">{{ item.sellingPrice }}</span>
            </div>
            <span>{{ item.name }}</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button">加入购物车</el-button>
            </div>
          </div>
        </el-card>
        <div class="shopMessage">
          <div class="info-box" style="margin-top: 10px;">
            <span class="title">名字： </span>
            <span class="info">{{ item.name }}</span>
          </div>
          <div class="info-box" style="margin-top: 10px;">
            <span class="title">价格： </span>
            <span class="info">{{ item.sellingPrice }}</span>
            <span style="margin-left: 5px;">/</span>
            <span style="margin-left: 5px;">{{ item.unit }}</span>
          </div>
          <div class="info-box" style="margin-top: 10px;">
            <span class="title">销售： </span>
            <span class="info">{{ item.soldNum }}</span>
          </div>
          <div class="info-box" style="margin-top: 10px;">
            <span class="title">库存： </span>
            <span class="info">{{ item.inventoryNum }}</span>
          </div>
          <div class="info-box" style="margin-top: 10px;">
            <span class="title">描述： </span>
            <span class="info">{{ item.description }}</span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmartPetHospitalUserSupplies',

  data () {
    return {
      shopInfo: '',
      options: [{}],
      imgList: [require('../../assets/images/loginImg/muyulu.webp'),
        require('../../assets/images/loginImg/chumaoshua.jpg'),
        require('../../assets/images/loginImg/weishiqi.webp'),
        require('../../assets/images/loginImg/maosha.webp'),
        require('../../assets/images/loginImg/maoliang.webp'),
        require('../../assets/images/loginImg/gouliang.webp'),
        require('../../assets/images/loginImg/shuliang.webp')]
    }
  },

  mounted () {
    this.getAllSupplies()
  },

  methods: {
    // 获取所有商品
    getAllSupplies () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allSupplies, form).then((res) => {
        this.shopInfo = res.content
        console.log(res.content)
      })
    },
    // 查找商品
    findSupplies () {
      const form = {
        searchName: 'name',
        searchInfo: this.val,
        page: 1
      }
      this.$get(this.$api.url.findSupplies, form).then((res) => {
        this.shopInfo = res.data
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

.el-button--primary {
  margin-left: 30px;
}

.shops {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .shopMessage {
    display: none;
  }

  .shop {
    width: 20%;
    margin: 2.5%;
    display: flex;
    position: relative;

    &:hover .shopMessage {
      background-color: white;
      display: inline-block;
      position: absolute;
      z-index: 99;
      top: 0;
      left: 250px;
      width: 270px;
      height: 100%;
    }

    &:hover:nth-child(4n) .shopMessage {
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
.shops img{
  width: 250px;
  height: 250px;
}
</style>
