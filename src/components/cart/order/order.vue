<template>
  <!-- 确认订单页面 -->
  <div>
    <!-- 顶部 -->
    <div class="header">
      <i
        class="iconfont icon-back"
        style="color:#909295;font-size:25px;margin:0 10px;"
        @click="back"
      ></i>
      <span class="headerText">确认订单</span>
      <i class="iconfont icon-more" style="color:#909295;font-size:25px;margin:0 10px;"></i>
    </div>

    <!-- 地址 -->
    <div class="address" v-if="haveAddress" @click="chooseAddress">
      <div class="addressInfo">
        <div class="addressInfoTitle">{{address.name}} {{telNum}}</div>
        <div>
          <span class="red" v-if="address.isDefault">默认</span>
          <span class="addressInfoText">{{address.city}}{{address.addressDetail}}</span>
        </div>
      </div>
      <i class="iconfont icon-right" style="color:#cccccc;margin-right:10px;"></i>
    </div>

    <!-- 没有地址 -->
    <div class="noAddress" v-if="!haveAddress">
      <button class="noAddressBtn" @click="chooseAddress">+ 添加地址</button>
    </div>

    <!-- 商品信息 -->
    <div class="cart">
      <div class="shopName">
        <i class="iconfont icon-jd-copy" style="color:#999999;font-size:18px;margin-right:5px;"></i>
        <span class="shopNameTitle">京东自营</span>
      </div>
      <div class="goodList" v-for="(good,index) in goods">
        <img :src="good.pic" alt>
        <div class="goodInfo">
          <div class="goodInfoTitle">
            <img
              src="https://img11.360buyimg.com/jdphoto/s102x28_jfs/t14512/288/2659278877/2368/8468a10d/5aadf9daNd4909ddc.png!q70.webp"
              alt
            >
            <span class="goodInfoText">{{good.goodName}}</span>
          </div>
          <div class="goodInfoKouwei">0.72kg/件, {{good.kouwei}}</div>
          <div class="goodInfoPriceAndCount">
            <div class="goodInfoPrice">￥{{good.price}}</div>
            <div class="goodCount">x {{good.count}}</div>
          </div>
        </div>
      </div>
      <div class="peiSong">
        <span class="peiSongItem1">配送服务</span>
        <span class="peiSongItem2">京东快递</span>
      </div>
      <div class="tuiHuan">
        <span class="tuiHuanItem1">退换无忧</span>
        <span class="tuiHuanItem2">￥0.20</span>
      </div>
    </div>

    <!-- 卡片 -->
    <div class="card">
      <div class="cardItem">
        <span class="cardItemTitle">促销优惠</span>
        <div class="cardItemText1">
          <span>查看更多优惠</span>
          <i class="iconfont icon-right" style="color:#cccccc;margin:0 10px;"></i>
        </div>
      </div>
      <div class="cardItem">
        <span class="cardItemTitle">发票信息</span>
        <div class="cardItemText2">
          <span>电子发票 个人 商品明细</span>
          <i class="iconfont icon-right" style="color:#cccccc;margin:0 10px;"></i>
        </div>
      </div>
      <div class="cardItem">
        <span class="cardItemTitle">礼品卡</span>
        <div class="cardItemText3">
          <span>无可用</span>
          <i class="iconfont icon-right" style="color:#cccccc;margin:0 10px;"></i>
        </div>
      </div>
      <div class="cardItem">
        <span class="cardItemTitle">京豆</span>
        <div class="cardItemText3">
          <span>未满1000个，暂不可使用</span>
          <i class="iconfont icon-right" style="color:#cccccc;margin:0 10px;"></i>
        </div>
      </div>
    </div>

    <!-- 价格 -->
    <div class="price">
      <div class="priceItem">
        <span class="priceItemTitle">商品金额</span>
        <span class="priceItemText">￥{{price}}</span>
      </div>
      <div class="priceItem">
        <span class="priceItemTitle">运费</span>
        <span class="priceItemText">+￥{{yunFei}}</span>
      </div>
      <div class="priceItem1">
        <span class="priceItemTitle">总价：</span>
        <span class="priceItemText">￥{{totalPrice}}</span>
      </div>
    </div>

    <!-- 按钮 -->
    <div class="btn">
      <button class="btn1">货到付款</button>
      <button class="btn2" @click="toPay">在线支付</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      haveAddress: true,
      address: {},
      goods: [],
      telNum: "",
      yunFei: "8.00"
    };
  },
  computed: {
    // 计算商品总价
    price() {
      var price = 0;
      for (var i = 0; i < this.goods.length; i++) {
        price += this.goods[i].count * parseFloat(this.goods[i].price);
      }
      let totalPrice = price.toFixed(2);
      return totalPrice;
    },
    // 计算商品总价以及运费总和
    totalPrice() {
      var total = (parseFloat(this.price) + parseFloat(this.yunFei)).toFixed(2);
      return total;
    }
  },
  created() {
    axios
      .get("http://localhost:7001/getInfo", {
        params: {
          userName: localStorage.userName
        }
      })
      .then(res => {
        // 如果用户保存过收货地址
        if (res.data[0].address.length !== 0) {
          for (var i = 0; i < res.data[0].address.length; i++) {
            // 如果用户存在默认地址
            if (res.data[0].address[i].isChoose === true) {
              this.haveAddress = true;
              this.address = res.data[0].address[i];
              this.telNum =
                this.address.telNum.slice(0, 3) +
                "*****" +
                this.address.telNum.slice(8);
              break;
            } else {
              this.haveAddress = false;
            }
          }
          // 用户之前未保存收货地址
        } else {
          this.haveAddress = false;
        }

        // 获取用户购物车中选中的商品
        var cart = res.data[0].cart;
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].checkStatus === true) {
            this.goods.push(cart[i]);
          }
        }
      });
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    chooseAddress() {
      this.$router.push({ path: "/address", query: { order: "order" } });
    },
    toPay() {
      if (this.haveAddress !== true) {
        Toast("收货地址不能为空！");
      } else {
        if (this.goods.length === 0) {
          Toast("系统出错，请重新选择商品！");
        } else {
          var order = {};
          order.address = this.address;
          order.goods = this.goods;
          order.price = this.totalPrice;
          order.orderNum = Date.now();
          this.$router.push({ name: "Pay", params: { order: order } });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./order.scss";
</style>
