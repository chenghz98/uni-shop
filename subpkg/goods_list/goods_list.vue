<template>
  <view>
    <view class="goods-list-container">
      <view v-for="(item, i) in goodsList" :key="i" @click="toGoodsDetail(item)">
          <!-- 为 my-goods 组件动态绑定 goods 属性的值 -->
          <my-goods :goods="item"></my-goods>
        </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goodsList: [],
        // 请求参数对象
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类Id
          cid: '',
          // 页码值
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 10
        },
        total:0,
         isLoading:false
      };
    },
    methods: {
      // 获取商品列表数据
      async getGoodsList() {
        this.isLoading=true
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        if(res.meta.status!==200) return uni.showToast('获取数据失败')
        // 商品列表为旧数据加上新获取的数据
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
        console.log(this.goodsList)
        this.isLoading=false
      },
      toGoodsDetail(item){
        uni.navigateTo(
         { url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id}
        )
      }
    },
    // 声明上拉触底事件
    onReachBottom() {
      if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.showToast({
        icon:"none",
        title:'人家也是有底线的了~~~'
      })
      // 添加节流阀，防止数据加载的过程中多次触底、多次发起请求加载数据
      if(this.isLoading) return 
      // 当前页码加一，
      this.queryObj.pagenum += 1
      // 重新拉去数据
      this.getGoodsList()
      
    },
    onPullDownRefresh() {
      
        // 1. 重置关键数据
        this.queryObj.pagenum = 1
        this.total = 0
        this.isloading = false
        this.goodsList = []
      
        // 2. 重新发起请求
        this.getGoodsList()
       uni.stopPullDownRefresh()
    },
    onLoad(options) {
      // 将页面参数转存到 this.queryObj 对象中
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    }
  }
</script>

<style lang="scss">
.goods-list-item{
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;
  .item-letf-img{
    margin-right: 5px;
    image{
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .item-right-detail{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .goods-name{
      font-size: 13px;
    }
    .goods-price{
      font-size: 16px;
      color: #c00000;
    }
  }
}
</style>
