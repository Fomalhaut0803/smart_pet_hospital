<template>
    <div class="layout">
        <LeftView class="fl"></LeftView>
        <TopView class="fl" :title="title"></TopView>
    </div>
</template>

<script>
import LeftView from '@/components/LeftView.vue'
import TopView from '@/components/TopView.vue'
export default {
  name: 'SmartPetHospitalLayoutView',

  data () {
    return {
      title: '预约'
    }
  },

  mounted () {

  },

  methods: {

  },
  components: {
    LeftView,
    TopView
  }
}
</script>

<style lang="scss" scoped>
.layout{
    width: 100%;
    height: 100%;
}
</style>
