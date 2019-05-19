<template>
  <!-- 支付成功页面 -->
  <div>
    <!-- 顶部 -->
    <div class="header">
      <span class="headerText">订单支付成功</span>
    </div>

    <div class="order">
      <svg class="icon" aria-hidden="true" style="font-size:60px;margin-right:20px;">
        <use xlink:href="#icon-zhifuchenggong"></use>
      </svg>
      <div class="orderItem">
        <div>
          <span class="orderItemTitle">支付方式：</span>
          <span class="orderItemText">银行卡支付</span>
        </div>
        <div>
          <span class="orderItemTitle">订单金额：</span>
          <span class="orderItemText">￥{{order.price}}</span>
        </div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div class="btns">
      <button class="btn" @click="orderDetail">查看订单</button>
      <button class="btn" @click="goBack">返回首页</button>
    </div>

    <!-- 提示信息 -->
    <div class="attention">注意：京东平台及销售商不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作。</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      order: {},
      time: ''
    };
  },
  created() {
    this.order = this.$route.params.order;
    this.time = this.order.orderNum;
    console.log(this.order);
    axios
      .post("http://jd.hhp.im/addOrder", {
        userName: localStorage.userName,
        order: this.order
      })
      .then(res => {
        console.log(res.data);
      });
  },
  methods: {
    orderDetail() {
      this.$router.push({ name: "OrderDetail", params: { order: this.order } });
    },
    goBack() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./success.scss";
</style>
