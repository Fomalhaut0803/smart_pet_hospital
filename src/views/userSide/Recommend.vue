<template>
    <div>
        <div id="supplies" style="width: 600px; height: 400px"></div>
    </div>
</template>

<script>
import { initPieChart } from '../../utils/pieCharts.js'
export default {
  name: 'SmartPetHospitalRecommend',

  data () {
    return {
      pieData: []
    }
  },

  mounted () {
    this.getAllOrders()
  },
  methods: {
    getAllOrders () {
      const form = {
        page: 1
      }
      this.$get(this.$api.url.allOrders, form).then((res) => {
        this.ordersInfo = res.content
        this.dealPieData(res.content)
        console.log(res)
      })
    },
    dealPieData (content) {
      const pieMap = {}
      // eslint-disable-next-line array-callback-return
      content.map(item => {
        // eslint-disable-next-line array-callback-return
        item.mainfest.map(item2 => {
          pieMap[item2.name] ? pieMap[item2.name] += item2.num : pieMap[item2.name] = item2.num
        })
      })
      this.pieData = []
      for (const key in pieMap) {
        this.pieData.push({
          value: pieMap[key],
          name: key
        })
      }
      initPieChart(this.pieData, 'supplies')
      console.log(pieMap)
    //   console.log(pieMap)
    }
  }
}
</script>

<style lang="scss" scoped></style>
