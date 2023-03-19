<!--
 * @Author: wei yin
 * @Date: 2023-03-18 20:15:34
 * @LastEditors: wei yin
 * @LastEditTime: 2023-03-19 15:02:28
 * @Description:
-->
<template>
    <div class="layout">
        <TopView class="top" :title="title"></TopView>
        <div class="right">
            <LeftView class="left"></LeftView>
            <div class="main scroll">
                <router-view />
            </div>
        </div>
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
    // display: flex;
}

.left {
    height: 100%;
    width: 17%;
}

.right {
    width: 100%;
    height: calc(100% - 65px);
    display: flex;
}

.top {
    height: 65px;
    width: 100%;
}

.main {
    width: 100%;
    height: 100%;
    padding: 10px;

    .form {
        width: 32%;
    }
}
.scroll{
    overflow-y: scroll;
}
</style>
