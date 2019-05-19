<template>
  <!-- 商品详情页面 -->
  <div>
    <!-- 顶部 -->
    <div class="header">
      <i
        class="iconfont icon-back"
        style="color:#909295;font-size:25px;margin:0 10px;"
        @click="back"
      ></i>
      <span class="headerText">商品</span>
      <span class="headerText">评价</span>
      <span class="headerText">详情</span>
      <span class="headerText">推荐</span>
      <i class="iconfont icon-more" style="color:#909295;font-size:25px;margin:0 10px;"></i>
    </div>

    <div class="box1"></div>

    <!-- 轮播图 -->
    <div class="swiper">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item, index) in banners" :key="index">
          <img :src="item">
        </swiper-slide>
        <div id="swiperOwn" class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <!-- 产品名称、价钱 -->
    <div class="goodInfo">
      <div class="goodInfoName">
        <img src="../../../assets/ziying.png" alt>
        <span class="goodInfoNameText">{{goodName}}</span>
      </div>
      <div class="goodInfoR">超市周年庆，礼献中秋，享各国美食，尽在京东进口粮油调味！京东自营，质量把控</div>
      <div class="goodInfoPrice">
        <span class="goodInfoPriceS">￥</span>
        <span class="goodInfoPriceL">27</span>
        <span class="goodInfoPriceS">.90</span>
      </div>
      <div class="baitiao">
        <span class="baitiaoTitle">白条</span>
        <span class="baitiaoText">【激活白条】新用户下单立减10元</span>
        <i class="iconfont icon-more" style="color:#909295;font-size:20px;margin:0 10px;"></i>
      </div>
    </div>

    <!-- 口味 -->
    <div class="choose">
      <div class="chooseKouwei">
        <span class="chooseKouweiTitle">口味</span>
        <div @click="chooseKouwei" class="chooseKouwei1" v-bind:class="{ chooseKouwei2: red1 }">火鸡面</div>
        <div @click="chooseKouwei" class="chooseKouwei1" v-bind:class="{ chooseKouwei2: red2 }">辛拉面</div>
      </div>
      <div class="chooseCount">
        <span class="chooseCountTitle">数量</span>
        <div class="chooseCountBox">
          <i
            class="iconfont icon-jianhao"
            v-bind:class="{ keJian: isKeJian, buKeJian: !isKeJian }"
            @click="toMinus"
          ></i>
          <div class="chooseCountBoxInput">
            <input type="text" v-model="count" value="1">
          </div>
          <i class="iconfont icon-jiahao1 keJian" @click="toAdd"></i>
        </div>
      </div>
    </div>

    <div class="box2"></div>
    <!-- 底部 -->
    <div class="tab">
      <div class="tabItem">
        <i class="iconfont icon-comment" style="color:#666666;font-size:25px;margin-bottom:2px;"></i>
        <span class="tabItemText">联系客服</span>
      </div>
      <div class="tabItem">
        <i class="iconfont icon-shop" style="color:#666666;font-size:25px;margin-bottom:2px;"></i>
        <span class="tabItemText">进店</span>
      </div>
      <div class="tabItem" @click="toCart">
        <i class="iconfont icon-cart" style="color:#666666;font-size:25px;margin-bottom:2px;"></i>
        <span class="tabItemText">购物车</span>
      </div>
      <button class="addCart" @click="addCart">加入购物车</button>
      <button class="buy">立即购买</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { MessageBox } from "mint-ui";

export default {
  data() {
    return {
      // 轮播图
      banners: [
        require("../../../assets/huojimian.jpg"),
        require("../../../assets/huojimian1.jpg")
      ],
      // 轮播图配置
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        // loop: true,
        // autoplay: {
        //   delay: 2000,
        //   disableOnInteraction: false
        // },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      goodName:
        "韩国三养（SAMYANG）方便面 火鸡面 超辣鸡肉味拌面 700g（140g*5包入）",
      pic:
        "https://img11.360buyimg.com/evalpic/s240x240_jfs/t18781/125/2257798196/348908/1ef22cd9/5aed3238N5a4bc8f3.jpg",
      price: "27.90",
      red1: true,
      red2: false,
      count: 1,
      isKeJian: false,
      success: false
    };
  },
  watch: {
    count: function(val, oldval) {
      console.log(val);
      if (val == 1) {
        this.isKeJian = false;
      }
      if (val != 1) {
        this.isKeJian = true;
      }
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    chooseKouwei() {
      this.red1 = !this.red1;
      this.red2 = !this.red2;
    },
    toMinus() {
      if (this.count != 1) {
        this.count -= 1;
      }
    },
    toAdd() {
      this.count += 1;
    },
    toCart() {
      this.$router.push({ path: "/cart" });
    },
    // 加入购物车
    addCart() {
      if (localStorage.login !== "login") {
        MessageBox("提示", "请先登录！");
      } else {
        MessageBox("提示", "添加购物车成功！");
        this.success = true;
        if (this.success === true) {
          var kouwei;
          if (this.red1 === true) {
            kouwei = "火鸡面";
          } else {
            kouwei = "辛拉面";
          }

          axios
            .post("http://jd.hhp.im/addCart", {
              goodName: this.goodName,
              kouwei: kouwei,
              count: this.count,
              price: this.price,
              pic: this.pic,
              userName: localStorage.userName
            })
            .then(result => {
              var result = result.data;
              console.log(result);
            });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./goodDetail.scss";
</style>
