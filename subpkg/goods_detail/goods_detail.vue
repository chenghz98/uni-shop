<template>
  <view>
    <view class="detail-container" v-if="detailList.goods_name">
      <!-- 轮播图区域 -->
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
        <swiper-item class="swiper-item" v-for="(item,i) in detailList.pics" :key="i">
          <image :src="item.pics_big" mode="widthFix" @click="preview(i)"></image>
        </swiper-item>
      </swiper>
      <view class="goods-list">
        <view class="goods-price">
          ￥{{detailList.goods_price}}
        </view>
        <view class="goods-name-collect">
          <text class="good-name">{{detailList.goods_name}}</text>
          <view class="goods-collect">
            <uni-icons type="star" size="17"></uni-icons>
            <text>收藏</text>
          </view>
        </view>
        <view class="fast-mail">
          <text>快递：免运费</text>
        </view>
      </view>
      <view class="">
        <rich-text :nodes="detailList.goods_introduce"></rich-text>
      </view>
    </view>
    <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        detailList: {},
        goods_id: "",
        options: [{
          icon: 'shop',
          text: '店铺',
          infoBackgroundColor: '#007aff',
          infoColor: "red"
        }, {
          icon: 'cart',
          text: '购物车',
          info: 0
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    methods: {
      async getGoodsDetail(goods_id) {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id
        })
        // 替换修改数据，取出图片之间的空隙
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g, '<img style="dispaly:block"').replace(
          /webp/g, 'jpg')
        this.detailList = res.message
        console.log(this.detailList)
      },
      // 轮播图点击大图预览
      preview(i) {
        uni.previewImage({
          current: i,
          urls: this.detailList.pics.map(x => x.pics_big)
        })
      },
      onClick(e) {
        if(e.content.text==='购物车'){
          uni.switchTab({
            url:'../../pages/cart/cart'
          })
        }
        console.log(e)
      },
      buttonClick(e) {
        console.log(e)
        this.options[1].info++
      }
    },
    // 在onLoad中获取url携带的参数
    onLoad(options) {
      const goods_id = options.goods_id
      // console.log(options)
      this.getGoodsDetail(goods_id)
    }
  }
</script>

<style lang="scss">
  .detail-container {
    padding-bottom: 50px;
  }

  swiper {
    height: 750rpx;

    .swiper-item {
      image {
        width: 100%;
        height: 100%;

      }
    }
  }

  .goods-list {
    .goods-price {
      margin: 36rpx 0;
      font-size: 16px;
      color: #c00000;
    }

    .goods-name-collect {
      display: flex;
      font-size: 12px;

      .goods-collect {
        display: flex;
        width: 54px;
        height: 30px;
        padding: 2px;
        flex-direction: column;
        align-items: center;
        border-left: 1px solid #cccccc;
      }
    }

    .fast-mail {
      font-size: 12px;
      color: #cccccc;
      margin-bottom: 20px;
      margin-top: 5px;
    }
  }

  .uni-goods-nav {
    position: fixed;
    bottom: 0px;
    width: 100%;
  }
</style>
