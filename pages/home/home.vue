<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
      <swiper-item v-for="(item,i) in swiperList">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <view class="nav-list">
      <view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
        <image :src="item.image_src" mode=""></image>
      </view>
    </view>
    <view class="floor-list">
      <view class="floor-item" v-for="(item,i) in floorList" :key="i">
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <view class="floor-content">
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2!==0" :url="item2.url">
              <image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: []
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      async getSwiperList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.swiperList = res.message
        console.log(res.message)
      },
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
      },
      navClickHandler(item) {
        if (item.name === "分类") {
          uni.switchTab({
            url: "/pages/cate/cate"
          })
        }
        console.log(item)
      },
      async getFloorList() {
        const {data:res}=await uni.$http.get('/api/public/v1/home/floordata')
        res.message.forEach(floor=>{
          floor.product_list.forEach(pro=>{
            pro.url='/subpkg/goods_list/goods_list?'+pro.navigator_url.split('?')[1]
          })
        })
        this.floorList=res.message
        console.log(this.floorList)
      }
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;
    width: 100%;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  ,
  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-item image {
      width: 128rpx;
      height: 140rpx;
    }
  },
  .floor-item{
    .floor-title {
      height: 60rpx;
      width: 100%;
      display: flex;
    }
    .floor-content{
      display: flex;
      padding-left: 10rpx;
      .right-img-box{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .right-img-item{
        }
      }
    }
    
  }
 
</style>
