<template>
  <div class="main">
    <el-divider content-position="left">查询条件</el-divider>
    <div class="block">
      <el-cascader :options="options" :props="{ checkStrictly: true }" clearable>
      </el-cascader>
      <el-button type="primary" @click="siftAdopt()">搜索</el-button>
    </div>
    <el-divider content-position="left">领养列表</el-divider>
    <div class="adopts">
      <div v-for="(item, index) in adoptInfo" :key="item._id" class="adopt">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="imgList[index]"
            class="image">
          <div style="padding: 14px;">
            <span>{{ item.petName }}</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="change(item)">申请领养</el-button>
            </div>
          </div>
        </el-card>
        <div class="adoptMessage">
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
            <span class="title">状态： </span>
            <span class="info">{{ item.state }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserAdopt',

  data () {
    return {
      val: '',
      adoptInfo: [],
      options: [
        {
          label: '猫',
          value: '猫',
          children: [{
            value: '金渐层',
            label: '金渐层',
            children: [
              { value: '公', label: '公' },
              { value: '母', label: '母' }]
          }, {
            value: '银渐层',
            label: '银渐层',
            children: [
              { value: '公', label: '公' },
              { value: '母', label: '母' }]
          }, {
            value: '中华田园猫',
            label: '中华田园猫',
            children: [
              { value: '公', label: '公' },
              { value: '母', label: '母' }]
          }, {
            value: '布偶',
            label: '布偶',
            children: [
              { value: '公', label: '公' },
              { value: '母', label: '母' }]
          }]
        },
        {
          label: '狗',
          value: '狗',
          children: [{
            value: '金毛',
            label: '金毛',
            children: [
              { value: '公', label: '公' },
              { value: '母', label: '母' }]
          }, {
            value: '柴犬',
            label: '柴犬',
            children: [
              { value: '公', label: '公' },
              { value: '母', label: '母' }]
          }, {
            value: '中华田园犬',
            label: '中华田园犬',
            children: [
              { value: '公', label: '公' },
              { value: '母', label: '母' }]
          }, {
            value: '边牧',
            label: '边牧',
            children: [
              { value: '公', label: '公' },
              { value: '母', label: '母' }]
          }]
        },
        {
          label: '鼠',
          value: '鼠',
          children: [{
            value: '豚鼠',
            label: '豚鼠',
            children: [
              { value: '公', label: '公' },
              { value: '母', label: '母' }]
          }, {
            value: '金丝熊',
            label: '金丝熊',
            children: [
              { value: '公', label: '公' },
              { value: '母', label: '母' }]
          }, {
            value: '蜜袋鼬',
            label: '蜜袋鼬',
            children: [
              { value: '公', label: '公' },
              { value: '母', label: '母' }]
          }]
        },
        {
          label: '鸟',
          value: '鸟',
          children: [{
            value: '金丝雀',
            label: '金丝雀',
            children: [
              { value: '公', label: '公' },
              { value: '母', label: '母' }]
          }, {
            value: '鹦鹉',
            label: '鹦鹉',
            children: [
              { value: '公', label: '公' },
              { value: '母', label: '母' }]
          }, {
            value: '画眉鸟',
            label: '画眉鸟',
            children: [
              { value: '公', label: '公' },
              { value: '母', label: '母' }]
          }]
        }],
      imgList: [require('../../assets/images/loginImg/fatorangecat.webp'),
        require('../../assets/images/loginImg/sanhuacat.webp'),
        require('../../assets/images/loginImg/chaiquan.webp'),
        require('../../assets/images/loginImg/bianmu.webp'),
        require('../../assets/images/loginImg/huazhishu.webp'),
        require('../../assets/images/loginImg/jinjianceng.webp'),
        require('../../assets/images/loginImg/maque.webp')]
    }
  },

  mounted () {
    this.getAllAdopt()
  },

  methods: {
    // 获取所有宠物领养
    getAllAdopt () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allAdopt, form).then((res) => {
        this.adoptInfo = res.content
        console.log(res.content)
      })
    },
    // 筛选宠物领养
    siftAdopt () {
      const form = {
        type: '猫',
        variety: '中华田园猫',
        sex: '母'
      }
      this.$get(this.$api.url.siftAdopt, form).then((res) => {
        this.adoptInfo = res.content
        console.log(res.content)
      })
    },
    // 改变领养状态（申请领养）
    changeState (item) {
      this.$post(this.$api.url.changeState, item).then((res) => {
        // this.adoptInfo = res.content
        this.getAllAdopt()
        console.log(item)
      })
    },
    change (item) {
      if (item.state === '可领养') {
        alert('领养成功！')
        this.changeState(item)
      } else {
        alert('该宠物已被领养，不可再次领养')
      }
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

.adopts {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .adoptMessage {
    display: none;
  }

  .adopt {
    width: 20%;
    margin: 2.5%;
    display: flex;
    position: relative;

    &:hover .adoptMessage {
      background-color: white;
      display: inline-block;
      position: absolute;
      z-index: 99;
      top: 0;
      left: 250px;
      width: 270px;
      height: 100%;
    }

    &:hover:nth-child(4n) .adoptMessage {
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
.adopt img{
  width: 250px;
  height: 250px;

}
</style>
