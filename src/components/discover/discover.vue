<template>
  <!-- 发现页面 -->
  <div>
    <!-- 顶部 -->
    <div class="header">
      <i class="iconfont icon-back" style="color:#909295;font-size:25px;margin:0 10px;" @click="back"></i>
      <span class="headerText">发现</span>
      <i class="iconfont icon-more" style="color:#909295;font-size:25px;margin:0 10px;"></i>
    </div>
    <div class="box"></div>
    <!-- 标签页 -->
    <van-tabs v-model="active">
      <!-- 标签一 -->
      <van-tab title="精选">
        <div class="article">
          <div class="articleTit">
            <div class="title">2018年度最具口碑精选日料店推荐</div>
            <div class="time">娱乐网  2018-12-21</div>
          </div>
          <img src="../../assets/鳗鱼.png" alt="">
        </div>
        <div class="article">
          <div class="articleTit">
            <div class="title">2018年度最具口碑精选日料店推荐</div>
            <div class="time">娱乐网  2018-12-21</div>
          </div>
          <img src="../../assets/鳗鱼.png" alt="">
        </div>
        <div class="article">
          <div class="articleTit">
            <div class="title">2018年度最具口碑精选日料店推荐</div>
            <div class="time">娱乐网  2018-12-21</div>
          </div>
          <img src="../../assets/鳗鱼.png" alt="">
        </div>
      </van-tab>
      <!-- 标签二 -->
      <van-tab title="生活">
        <div class="article">
          <div class="articleTit">
            <div class="title">2018年度最具口碑精选日料店推荐</div>
            <div class="time">娱乐网  2018-12-21</div>
          </div>
          <img src="../../assets/鳗鱼.png" alt="">
        </div>
        <div class="article">
          <div class="articleTit">
            <div class="title">2018年度最具口碑精选日料店推荐</div>
            <div class="time">娱乐网  2018-12-21</div>
          </div>
          <img src="../../assets/鳗鱼.png" alt="">
        </div>
      </van-tab>
      <!-- 标签三 -->
      <van-tab title="视频">
        <div class="article">
          <div class="articleTit">
            <div class="title">2018年度最具口碑精选日料店推荐</div>
            <div class="time">娱乐网  2018-12-21</div>
          </div>
          <img src="../../assets/鳗鱼.png" alt="">
        </div>
      </van-tab>
      <!-- 标签四 -->
      <van-tab title="数码">
        <div class="article">
          <div class="articleTit">
            <div class="title">2018年度最具口碑精选日料店推荐</div>
            <div class="time">娱乐网  2018-12-21</div>
          </div>
          <img src="../../assets/鳗鱼.png" alt="">
        </div>
        <div class="article">
          <div class="articleTit">
            <div class="title">2018年度最具口碑精选日料店推荐</div>
            <div class="time">娱乐网  2018-12-21</div>
          </div>
          <img src="../../assets/鳗鱼.png" alt="">
        </div>
        <div class="article">
          <div class="articleTit">
            <div class="title">2018年度最具口碑精选日料店推荐</div>
            <div class="time">娱乐网  2018-12-21</div>
          </div>
          <img src="../../assets/鳗鱼.png" alt="">
        </div>
        <div class="article">
          <div class="articleTit">
            <div class="title">2018年度最具口碑精选日料店推荐</div>
            <div class="time">娱乐网  2018-12-21</div>
          </div>
          <img src="../../assets/鳗鱼.png" alt="">
        </div>
        <div class="article">
          <div class="articleTit">
            <div class="title">2018年度最具口碑精选日料店推荐</div>
            <div class="time">娱乐网  2018-12-21</div>
          </div>
          <img src="../../assets/鳗鱼.png" alt="">
        </div>
        <div class="article">
          <div class="articleTit">
            <div class="title">2018年度最具口碑精选日料店推荐</div>
            <div class="time">娱乐网  2018-12-21</div>
          </div>
          <img src="../../assets/鳗鱼.png" alt="">
        </div>
        <div class="article">
          <div class="articleTit">
            <div class="title">2018年度最具口碑精选日料店推荐</div>
            <div class="time">娱乐网  2018-12-21</div>
          </div>
          <img src="../../assets/鳗鱼.png" alt="">
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
export default {
  data() {
    return {
      active: 0
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./discover.scss";
</style>
