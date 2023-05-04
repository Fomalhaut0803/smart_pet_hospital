<template>
  <div class="main">
    <el-badge :value="shopTotal" class="item fr">
      <i
        class="el-icon-shopping-cart-2"
        @click="shopCartTableVisible = true"
      ></i>
    </el-badge>
    <el-divider content-position="left">查询条件</el-divider>
    <div class="block">
      <el-form
        label-position="right"
        label-width="120px"
        style="paddingright: 20px"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="名字" class="minlab">
              <el-input
                size="small"
                v-model="shopName"
                placeholder="请输入商品名字"
              ></el-input>
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
      <div v-for="(item, index) in shopInfo" :key="item._id" class="shop">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="imgList[index]" class="image" />
          <div style="padding: 14px">
            <div class="fr">
              <span style="margin-left: 60px">￥</span>
              <span style="color: red">{{ item.sellingPrice }}</span>
            </div>
            <span>{{ item.name }}</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="addCart(item)"
                >加入购物车</el-button
              >
            </div>
          </div>
        </el-card>
        <div class="shopMessage">
          <div class="info-box" style="margin-top: 10px">
            <span class="title">名字： </span>
            <span class="info">{{ item.name }}</span>
          </div>
          <div class="info-box" style="margin-top: 10px">
            <span class="title">价格： </span>
            <span class="info">{{ item.sellingPrice }}</span>
            <span style="margin-left: 5px">/</span>
            <span style="margin-left: 5px">{{ item.unit }}</span>
          </div>
          <div class="info-box" style="margin-top: 10px">
            <span class="title">销售： </span>
            <span class="info">{{ item.soldNum }}</span>
          </div>
          <div class="info-box" style="margin-top: 10px">
            <span class="title">库存： </span>
            <span class="info">{{ item.inventoryNum }}</span>
          </div>
          <div class="info-box" style="margin-top: 10px">
            <span class="title">描述： </span>
            <span class="info">{{ item.description }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 购物车 -->
    <el-dialog title="购物车" :visible.sync="shopCartTableVisible">
      <el-table :data="userCart.list" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          property="name"
          label="商品名称"
          width="150"
        ></el-table-column>
        <el-table-column
          property="sellingPrice"
          label="单价"
          width="200"
        ></el-table-column>
        <el-table-column property="num" label="数量">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.num"
              :min="1"
              :max="scope.row.inventoryNum"
              size="mini"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-popover placement="top" width="160" v-model="visible">
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false"
                  >取消</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  @click="deleteShop(scope.row)"
                  >确定</el-button
                >
              </div>
              <el-button slot="reference" type="danger" size="mini">删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        合计：￥{{ totalPrice }}元
        <el-button type="primary" @click="shopCartTableVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SmartPetHospitalUserSupplies',

  data () {
    return {
      multipleSelection: [], // 选中
      shopCartTableVisible: false, // 购物车弹窗
      shopName: '', // 商品名字
      user: {},
      shopInfo: [],
      options: [{}],
      userCart: {
        list: [],
        shopMap: {}
      },
      imgList: [
        require('../../assets/images/loginImg/muyulu.webp'),
        require('../../assets/images/loginImg/chumaoshua.jpg'),
        require('../../assets/images/loginImg/weishiqi.webp'),
        require('../../assets/images/loginImg/maosha.webp'),
        require('../../assets/images/loginImg/maoliang.webp'),
        require('../../assets/images/loginImg/gouliang.webp'),
        require('../../assets/images/loginImg/shuliang.webp')
      ]
    }
  },

  mounted () {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.getCart()
    this.getAllSupplies()
  },
  computed: {

    // 总价
    totalPrice () {
      return this.multipleSelection.reduce((pre, cur) => {
        return cur.num * cur.sellingPrice + pre
      }, 0)
    },
    // 购物车总数
    shopTotal () {
      return this.userCart.list.reduce((pre, cur) => {
        return cur.num + pre
      }, 0)
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // 获取购物车列表
    getCart () {
      const cart = JSON.parse(localStorage.getItem(`${this.user._id}-cart`))
      if (cart) this.userCart = cart
      // if (!this.userCart) {
      //   this.$set(this.userCart, 'list', [])
      //   this.$set(this.userCart, 'shopMap', {})
      // }
    },
    // 将购物车存入本地
    setCart (obj) {
      localStorage.setItem(`${this.user._id}-cart`, JSON.stringify(obj))
    },
    // 添加到购物车
    addCart (item) {
      if (!this.userCart) this.userCart.list = []
      if (this.userCart.shopMap[item.name]) {
        this.userCart.list.map((item2) => {
          if (item2.name === item.name) item2.num += 1
          return null
        })
      } else {
        this.userCart.list.push({ num: 1, ...item })
        this.userCart.shopMap[item.name] = 1
      }
      this.setCart(this.userCart)
      this.$message({
        type: 'success',
        message: '添加成功'
      })
    },

    // 删除
    deleteShop (item) {
      this.userCart.list.map((item2, index) => {
        if (item._id === item2._id) {
          this.userCart.list.splice(index, 1)
          delete this.userCart.shopMap[item.name]
        }
        return null
      })
    },

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
.shops img {
  width: 250px;
  height: 250px;
}
.el-icon-shopping-cart-2{
  font-size: 25px;
  cursor: pointer;
}
</style>
