<template>
  <div class="myPet">
    <div class="pets">
      <div class="pet" v-for="item in 10" :key="item">
        <el-card
          class="pet-card"
          shadow="hover"
          :body-style="{ padding: '0px' }"
        >
          <div slot="header" class="clearfix">
            <span>大黄</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="navTo('/petDetail')"
              >宠物详情</el-button
            >
          </div>
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentDate: new Date()
    }
  },
  methods: {
    navTo (url) {
      this.$router.push(url)
    }
  }
}
</script>
<style lang="scss" scoped>
.myPet {
  width: 100%;
  .pets {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .pet {
      margin: 20px;
    }
  }
}
</style>
