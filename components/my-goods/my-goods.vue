<template>
  <view>
    <view class="goods-list-item">
      <view class="item-letf-img">
        <image :src="goods.goods_small_logo||defaultPic" mode=""></image>
      </view>
      <view class="item-right-detail">
        <text class="goods-name">{{goods.goods_name}}</text>
        <text class="goods-price">￥{{goods.goods_price|tofixed}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    // 定义 props 属性，用来接收外界传递到当前组件的数据
    props: {
      // 商品的信息对象
      goods: {
        type: Object,
        defaul: {},
      },
    },
    filters: {
      // 把数字处理为带两位小数点的数字
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    },
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    }
  }
</script>

<style lang="scss">
  .goods-list-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .item-letf-img {
      margin-right: 5px;

      image {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .item-right-detail {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
    }
  }
</style>
