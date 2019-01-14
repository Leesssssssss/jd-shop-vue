<template>
<!-- 商品分类页面 -->
  <div>
    <!-- 顶部搜索框 -->
    <div class="search">
      <div class="searchItem">
        <i class="iconfont icon-back" style="color:#909295;font-size:25px;margin:0 10px;" @click="back"></i>
      </div>
      <div class="input">
        <i class="iconfont icon-search" style="color:#b7b7b7;font-size:18px;position:relative;left:30px;"></i>
        <input type="text" placeholder="roseonly京东超级品牌日">
      </div>
      <div class="searchItem">
        <i class="iconfont icon-more" style="color:#909295;font-size:25px;margin:0 10px;"></i>
      </div>
    </div>
    
    <el-container class="classify">
      <!-- 左侧导航栏 -->
      <el-aside width="24vw" class="leftNav" style="background-color: #f8f8f8">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#f8f8f8"
          text-color="black"
          active-text-color="#e93b3d"
          @select="handleSelect">
          <el-menu-item index="1">
            <span slot="title">热门推荐</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span slot="title">手机数码</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span slot="title">家用电器</span>
          </el-menu-item>
          <el-menu-item index="4">
            <span slot="title">电脑办公</span>
          </el-menu-item>
          <el-menu-item index="5">
            <span slot="title">美妆护肤</span>
          </el-menu-item>
          <el-menu-item index="6">
            <span slot="title">个护清洁</span>
          </el-menu-item>
          <el-menu-item index="7">
            <span slot="title">汽车用品</span>
          </el-menu-item>
          <el-menu-item index="8">
            <span slot="title">京东超市</span>
          </el-menu-item>
          <el-menu-item index="9">
            <span slot="title">图书音像</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 右侧内容 -->
      <el-main>
        <div class="main">
          <div class="mainTitle">热销产品</div>
          <div class="mainContainer">
            <div class="mainContainerBox" v-for="one in c" @click="toGoodDetail">
              <img :src="one.src" alt="">
              <div class="mainContainerText">{{one.text}}</div>
            </div>
          </div>
        </div>
      </el-main>

    </el-container>


  </div>
</template>

<script>

export default {
  data() {
    return {
      c:[],
      c1: [
        {src: require('../../assets/c11.jpg'), text: '手机'},
        {src: require('../../assets/c12.png'), text: '电磁炉'},
        {src: require('../../assets/c13.png'), text: 'U盘'},
        {src: require('../../assets/c14.png'), text: '篮球'},
        {src: require('../../assets/c15.jpg'), text: '男鞋'}
      ],
      c2: [
        {src: require('../../assets/c21.jpg'), text: '华为'},
        {src: require('../../assets/c22.jpg'), text: 'iPhone'},
        {src: require('../../assets/c23.jpg'), text: '荣耀'},
        {src: require('../../assets/c24.png'), text: 'vivo'}
      ],
      c3: [
        {src: require('../../assets/c31.jpg'), text: '煮蛋器'},
        {src: require('../../assets/c32.jpg'), text: '面包机'}
      ],
      c4: [
        {src: require('../../assets/c41.jpg'), text: '组装电脑'},
        {src: require('../../assets/c42.png'), text: '轻薄本'}
      ],
      c5: [
        {src: require('../../assets/c51.jpg'), text: '明星同款面膜'},
        {src: require('../../assets/c52.jpg'), text: '显白口红'}
      ],
      c6: [
        {src: require('../../assets/c61.jpg'), text: '本色纸'},
        {src: require('../../assets/c62.jpg'), text: '个护馆'}
      ],
      c7: [
        {src: require('../../assets/c71.jpg'), text: '洗车水枪'},
        {src: require('../../assets/c72.jpg'), text: '车衣'}
      ],
      c8: [
        {src: require('../../assets/c81.jpg'), text: '衣物清洁'},
        {src: require('../../assets/c82.jpg'), text: '口腔护理'}
      ],
      c9: [
        {src: require('../../assets/c91.jpg'), text: '人文社科'},
        {src: require('../../assets/c92.jpg'), text: '文学'}
      ]
    }
  },
  mounted() {
    this.c = this.c1;
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    handleSelect(key, keyPath) {
      if (key == 1) {
        this.c  = this.c1;
      }
      if (key == 2) {
        this.c  = this.c2;
      }
      if (key == 3) {
        this.c  = this.c3;
      }
      if (key == 4) {
        this.c  = this.c4;
      }
      if (key == 5) {
        this.c  = this.c5;
      }
      if (key == 6) {
        this.c  = this.c6;
      }
      if (key == 7) {
        this.c  = this.c7;
      }
      if (key == 8) {
        this.c  = this.c8;
      }
      if (key == 9) {
        this.c  = this.c9;
      }
    },
    toGoodDetail() {
      this.$router.push({ 'path': '/goodDetail' });
    }
  }
}
</script>

<style lang="scss" scoped>
@import './classify.scss';

</style>
