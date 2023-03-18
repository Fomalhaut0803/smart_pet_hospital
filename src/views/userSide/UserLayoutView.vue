<template>
  <div class="layout">
    <LeftView class="left"></LeftView>
    <div class="right">
      <TopView class="top" :title="title"></TopView>
      <div class="main">
        <router-view />
      </div>
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

  mounted () {},

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
  display: flex;
}

.left {
  height: 100%;
  width: 15%;
  background-color: chocolate;
}
.right{
  width: 100%;
  height: 100%;
}

.top {
  background-color: crimson;
  height: 10%;
  width: 100%;
}

.main {
  background-color: aqua;
  width: 100%;
  height: 90%;
  .form {
    width: 85%;
  }
}
</style>
