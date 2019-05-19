<template>
  <!-- 订单详情页面 -->
  <div>
    <!-- 顶部 -->
    <div class="header">
      <i
        class="iconfont icon-back"
        style="color:#909295;font-size:25px;margin:0 10px;"
        @click="back"
      ></i>
      <span class="headerText">订单列表</span>
      <i class="iconfont icon-more" style="color:#909295;font-size:25px;margin:0 10px;"></i>
    </div>

    <!-- 搜索框 -->
    <div class="search">
      <i
        class="iconfont icon-search"
        style="color:#cccccc;font-size:18px;position:relative;left:30px;"
      ></i>
      <input type="text" placeholder="商品名称/商品编号/订单号">
    </div>

    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#ffffff"
      text-color="#333333"
      active-text-color="#e93b3d"
    >
      <el-menu-item index="1">所有订单</el-menu-item>
      <el-menu-item index="2">待付款</el-menu-item>
      <el-menu-item index="3">待收货</el-menu-item>
      <el-menu-item index="4">待完成</el-menu-item>
    </el-menu>

    <!-- 订单列表 -->
    <div class="orderList" v-for="order in orders" @click="toOrderDetail(order)">
      <div class="orderListItem">
        <div class="orderNum">
          <span class="orderNumTitle">订单号：</span>
          <span class="orderNumText">{{order.orderNum}}</span>
        </div>
        <i class="iconfont icon-delete" style="color:#d9d9d9;" @click.stop="deleteOrder(order)"></i>
      </div>

      <!-- @click.stop阻止事件继续传播 -->
      <div class="orderListItem">
        <div class="orderInfo">
          <div>
            <span class="orderInfoTitle">状态：</span>
            <span class="orderInfoTextR">已签收</span>
          </div>
          <div>
            <span class="orderInfoTitle">总价：</span>
            <span class="orderInfoText">￥{{order.price}}</span>
          </div>
        </div>
        <button class="btn" @click.stop="toBuy">再次购买</button>
      </div>

      <div class="goods">
        <div class="shopName">
          <i class="iconfont icon-jd-copy" style="color:#999999;font-size:18px;margin-right:5px;"></i>
          <span class="shopNameTitle">京东</span>
        </div>
        <div class="goodsList" v-for="good in order.goods">
          <img :src="good.pic" alt>
          <div class="goodsInfo">
            <div class="goodsName">{{good.goodName}}</div>
            <div class="goodsCount">x{{good.count}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom">已经没有更多订单了~</div>
  </div>
</template>

<script>
import axios from "axios";
import { MessageBox } from "mint-ui";

export default {
  data() {
    return {
      orders: [],
      activeIndex: "1"
    };
  },
  created() {
    axios
      .get("http://jd.hhp.im/getInfo", {
        params: { userName: localStorage.userName }
      })
      .then(res => {
        this.orders = res.data[0].order;
      });
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 删除订单
    deleteOrder(order) {
      MessageBox.confirm("确定删除该订单?")
        .then(action => {
          axios
            .post("http://jd.hhp.im/deleteOrder", {
              userName: localStorage.userName,
              _id: order._id
            })
            .then(res => {
              this.orders = res.data[0].order;
            });
        })
        .catch(err => {
          if (err == "cancel") {
            console.log("cancel");
          }
        });
    },
    toBuy() {
      this.$router.push({ path: "/goodDetail" });
    },
    toOrderDetail(order) {
      this.$router.push({ name: "OrderDetail", params: { order: order } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./orderList.scss";
</style>
