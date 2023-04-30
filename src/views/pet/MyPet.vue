<template>
  <div class="myPet">
    <div class="pets">
      <div class="pet" v-for="(item, index) in petList" :key="item._id">
        <el-card class="pet-card" shadow="hover" :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <span>{{ item.petName }}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="navTo(item)">宠物详情</el-button>
          </div>
          <img :src="imgList[index]" class="image" />
        </el-card>
      </div>
      <div class="add">
        <el-button type="text" @click="dialogVisible = true">
          <img src="../.././assets/images/main/add.png" alt="">
        </el-button>
      </div>
    </div>
    <div>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">
          <!-- <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
            :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog> -->
          <el-form-item label="宠物名字">
            <el-input v-model="form.petName"></el-input>
          </el-form-item>
          <el-form-item label="宠物性别">
            <el-select v-model="form.sex" placeholder="请选择宠物性别">
              <el-option label="公" value="公"></el-option>
              <el-option label="母" value="母"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="宠物年龄">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="宠物种类">
            <el-input v-model="form.type"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="getNewPet">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentDate: new Date(),
      petList: [],
      dialogVisible: false,
      // dialogImageUrl: '',
      form: {
        petName: '',
        region: '',
        age: '',
        type: ''
      },
      imgList: [require('../../assets/images/loginImg/cat1.jpg'),
        require('../../assets/images/loginImg/hamster3.png'),
        require('../../assets/images/loginImg/dog2.png'),
        require('../../assets/images/loginImg/panda.webp'),
        require('../../assets/images/loginImg/sanhuacat.webp')]
    }
  },
  mounted () {
    this.getAllPets()
  },
  methods: {
    navTo (item) {
      this.$router.push({ name: 'PetDetail', params: item })
    },
    // 查询宠物
    getAllPets () {
      const form = {
        searchName: 'petName',
        searchInfo: '',
        page: 1
      }
      this.$get(this.$api.url.allPet, form).then((res) => {
        this.petList = res.content
        console.log(res)
      })
    },
    handleClose (done) {
      this.$confirm('关闭后不再保存,确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    // 新增宠物
    getNewPet () {
      this.$post(this.$api.url.addPet, this.form).then((res) => {
        this.dialogFormVisible = false
        this.getAllPets()
      })
    }
    // handleRemove (file, fileList) {
    //   console.log(file, fileList)
    // },
    // handlePictureCardPreview (file) {
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // }
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

.add {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;

  img {
    width: 100px;
    height: 100px;
  }
}

.pet img {
  width: 250px;
  height: 250px;
}
</style>
