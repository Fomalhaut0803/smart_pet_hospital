<template>
    <div class="layout">
        <LeftView class="fl left"></LeftView>
        <TopView class="top" :title="title"></TopView>
        <div class="main">
            <!-- <router-view></router-view> -->
            <el-form ref="form" :model="form" label-width="80px" class="form">
                <!-- <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item> -->
                <el-form-item label="活动性质">
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                        <el-checkbox label="地推活动" name="type"></el-checkbox>
                        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                123435467
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- <div class="left"></div>
        <div class="top">123</div>
        <div class="main"><div style="width: 100%;">123</div></div> -->
    </div>
</template>

<script>
import LeftView from '@/components/LeftView.vue'
import TopView from '@/components/TopView.vue'

export default {
  name: 'SmartPetHospitalUserLayoutView',

  data () {
    return {
      title: '预约',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },

  mounted () {

  },

  methods: {
    onSubmit () {
      console.log('submit!')
    }
  },
  components: {
    LeftView,
    TopView
  }
}
</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100%;
}

.left {
    height: 100%;
    width: 15%;
    background-color: chocolate;
}

.top {
    background-color: crimson;
    height: 10%;
    width: 85%;
    margin-left: 15%;
    // float: left;
}

.main {
    background-color: aqua;
    width: 85%;
    height: 90%;
    margin-left: 15%;
    .form{
        width: 85%;
    }
}</style>
