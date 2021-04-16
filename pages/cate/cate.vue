<template>
  <view>
    <!-- <my-search :bgColor="'#678'"></my-search> -->
    <my-search @searchClick="toSearchhandler"></my-search>
    <view class="scroll-view-container">
      <scroll-view scroll-y="true" class="left-scroll-view" :style="{height: wh + 'px'}">
        <block v-for="(item,i) in cateList" :key="i">
          <view :class="['left-scroll-item',i===active?'active':'']" @click="activeChange(i)">{{item.cat_name}}</view>
        </block>

      </scroll-view>
      <scroll-view scroll-y="true" class="right-scroll-view" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
          <view class="cate-lv2-tilte">/{{item2.cat_name}}/</view>
          <view class="cate-lv3">
            <view class="cate-lv3-box" v-for="(item3,i3) in item2.children" :key="i3" @click="goToGoodsList(item3)">
              <image :src="item3.cat_icon" mode=""></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh: 0, //屏幕可用高度
        cateList: [],
        active: 0,
        cateLevel2: [],
        scrollTop:0
      };
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight-50
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        if (res.meta.status !== 200) return uni.showMsg()
        this.cateList = res.message
        this.cateLevel2 = this.cateList[0].children
      },
      activeChange(i) {
        this.active = i
        this.cateLevel2 = this.cateList[i].children
        this.scrollTop=this.scrollTop===0?1:0
      },
      goToGoodsList(item3){
        uni.navigateTo({
         url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
        })
      },
      toSearchhandler(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-item {
        line-height: 60px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;

        // 激活项的样式
        &.active {
          background-color: #ffffff;
          position: relative;

          // 渲染激活项左侧的红色指示边线
          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }

    .right-scroll-view {
      .cate-lv2 {
        .cate-lv2-tilte {
          text-align: center;
          font-weight: bold;
          margin-bottom: 10px;
          margin-top: 20px;
        }

        .cate-lv3 {
          display: flex;
          flex-wrap: wrap;
          .cate-lv3-box {
            width: 33.33%;
            margin-bottom: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            image {
              width: 60px;
              height: 60px;
            }
            text{
              font-size: 12px;
            }
          }
        }
      }
    }
  }
</style>
