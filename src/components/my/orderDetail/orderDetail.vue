<template>
  <!-- 订单详情页面 -->
  <div>
    <!-- 顶部 -->
    <div class="header">
      <i class="iconfont icon-back" style="color:#909295;font-size:25px;margin:0 10px;" @click="back"></i>
      <span class="headerText">订单详情</span>
      <i class="iconfont icon-more" style="color:#909295;font-size:25px;margin:0 10px;"></i>
    </div>

    <div class="orderTitle">
      <div class="orderTitleItem">
        <span class="title">订单状态：</span><span class="text">已签收</span>
      </div>
      <div class="orderTitleItem">
        <span class="title">订单编号：</span><span class="text">{{order.orderNum}}</span>
      </div>
      <div class="orderTitleItem">
        <span class="title">下单时间：</span><span class="text">{{order.orderNum | formatDate}}</span>
      </div>
      <button class="btn" @click="toBuy">再次购买</button>
    </div>

    <div class="orderInfo">
      <div class="orderInfoItem">
        <span class="title">商品金额：</span><span class="text">￥{{order.price}}</span><span class="title">（在线支付）</span>
      </div>
      <div class="orderInfoItem">
        <span class="title">收货地址：</span><span class="text">{{(order.address.city + order.address.addressDetail).replace(/\s*/g,"")}}</span>
      </div>
      <div class="orderInfoItem">
        <span class="title">收货人：</span><span class="text">{{order.address.name}}  {{order.address.telNum.slice(0, 3) + "****" + order.address.telNum.slice(7)}}</span>
      </div>
      <div class="orderInfoItem">
        <span class="title">配送方式：</span><span class="text">普通快递</span>
      </div>
    </div>

    <div class="orderInfo">
      <div class="orderInfoItem">
        <span class="title">发票类型：</span><span class="text">电子普通发票</span><span class="title">（已开票）</span>
      </div>
      <div class="orderInfoItem">
        <span class="title">发票抬头：</span><span class="text">个人</span>
      </div>
      <div class="orderInfoItem">
        <span class="title">发票内容：</span><span class="text">明细</span>
      </div>
    </div>

    <!-- 商品 -->
    <div class="goods">
      <div class="shopName">
        <div class="shopNameLeft">
          <i class="iconfont icon-jd-copy" style="color:#999999;font-size:18px;margin-right:5px;"></i>
          <span class="shopNameTitle">京东</span>
        </div>
        <div class="shopNameRight">共计{{num}}件商品</div>
      </div>
      <div class="goodsList" v-for="good in order.goods">
        <img :src="good.pic" alt="">
        <div class="goodsName">{{good.goodName}}</div>
        <div class="goodsInfo">
          <div class="goodsPrice">￥{{good.price}}</div>
          <div class="goodsCount">x{{good.count}}</div>
      </div>
      </div>
    </div>

    <!-- 价格 -->
    <div class="price">
      <div class="priceItem">
        <span class="priceItemTitle">商品总额</span>
        <span class="priceItemText">￥{{price}}</span>
      </div>
      <div class="priceItem">
        <span class="priceItemTitle">运费</span>
        <span class="priceItemText">+￥{{yunFei}}</span>
      </div>
      <div class="priceItem1">
        <span class="priceItemTitle">实付金额：</span>
        <span class="priceItemText">￥{{order.price}}</span>
      </div>
    </div>

    <div class="b">
      <button class="btn" @click="deleteOrder">删除订单</button>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import { MessageBox } from "mint-ui";

export default {
  data() {
    return {
      order: [],
      yunFei: "8.00"
    };
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  },
  computed: {
    // 商品总价
    price() {
      var price = 0;
      for (var i = 0; i < this.order.goods.length; i++) {
        price +=
          this.order.goods[i].count * parseFloat(this.order.goods[i].price);
      }
      let totalPrice = price.toFixed(2);
      return totalPrice;
    },
    // 商品总数量
    num() {
      var num = 0;
      for (var i = 0; i < this.order.goods.length; i++) {
        num += this.order.goods[i].count;
      }
      return num;
    }
  },
  created() {
    this.order = this.$route.params.order;
    console.log(this.order);
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    toBuy() {
      this.$router.push({ 'path': '/goodDetail' });
    },
    deleteOrder() {
      MessageBox.confirm("确定删除该订单?")
        .then(action => {
          axios
            .post("http://localhost:7001/deleteOrder", {
              userName: localStorage.userName,
              _id: this.order._id
            })
            .then(res => {
              this.$router.push({ 'path': '/orderList' });
            });
        })
        .catch(err => {
          if (err == "cancel") {
            console.log("cancel");
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./orderDetail.scss";
</style>
