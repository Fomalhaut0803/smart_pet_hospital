<template>
  <div class="myPet">
    <div class="pets">
      <div class="pet" v-for="item in petList" :key="item._id">
        <el-card
          class="pet-card"
          shadow="hover"
          :body-style="{ padding: '0px' }"
        >
          <div slot="header" class="clearfix">
            <span>{{item.name}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="navTo(item.name)"
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
      currentDate: new Date(),
      petList: []
    }
  },
  mounted () {
    this.findPets()
  },
  methods: {
    navTo (name) {
      this.$router.push({ name: 'PetDetail', params: { name: name } })
    },
    // 查询宠物
    findPets () {
      const form = {
        searchName: 'petName',
        searchInfo: '',
        page: 1
      }
      this.$get(this.$api.url.allPet, form).then(res => {
        this.petList = res.content
        console.log(res)
      })
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
