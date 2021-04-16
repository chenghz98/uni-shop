<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" cancelButton="none" class="iptSearch" v-model="value"></uni-search-bar>
    </view>
    <view class="search-container">
      <view class="search-history" v-if="kw.trim()===''">
        <view class="history_title">
          <text>搜索历史</text>
          <uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
        </view>
        <view class="history-list">
          <uni-tag :text="item" v-for="(item, i) in histories" :key="i" @click="gotoGoodsList(item)"></uni-tag>
        </view>
      </view>
      <view class="search-results">
        <view class="search-results-item" v-for="(item,i) in searchResults" :key="i" @click="toGoodsDetail(item.goods_id)">
          <view class="result_text">{{item.goods_name}}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        kw: '',
        searchResults: [],
        historyList: [],
        value:''
      };
    },
    methods: {
      input(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = e
          this.getSearchResults()
        }, 500)
      },
      async getSearchResults() {
        if (this.kw === '') {
          this.searchResults = []
          return
        }
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/qsearch?', {
          query: this.kw
        })
        if (res.meta.status !== 200) return uni.showToast('获取搜索建议列表失败')
        this.searchResults = res.message
        this.saveHistoryList()
      },
      toGoodsDetail(goods_id) {
        uni.navigateTo({
          url: '../goods_detail/goods_detail?goods_id=' + goods_id
        })
      },
      saveHistoryList() {
        //数组方法添加历史记录
       //  if(this.kw.trim()==='') return
       // const index = this.historyList.indexOf(this.kw)
       // if(index!==-1){
       //   this.historyList.splice(index,1)
       // }
       // this.historyList.unshift(this.kw)
       // 用Set()对象添加历史记录并去重(利用这种方法需要是将新的的历史记录添加到了末尾，需要利用计算属性将historyList翻转)
       // 1 将历史记录数组转换为Set（）对象
       const set = new Set(this.historyList)
       console.log(set)
       // 2 去重 用set的delete方法删除this.kw(有就删除)
       set.delete(this.kw)
       // 用add方法添加this.kw
       set.add(this.kw)
       //将this对象转换为数组
       this.historyList= Array.from(set)
       // 调用uni.setStorageSync(key,value)将数据存储到本地存储进行数据持久化
       uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      clearHistory(){
        this.historyList=[]
        uni.setStorageSync('kw',
        '[]')
      },
      gotoGoodsList(item){
        this.value=item
      }
    },
    computed:{
      histories(){
        return [...this.historyList].reverse()
      }
    },
    onLoad(){
      this.historyList=JSON.parse(uni.getStorageSync('kw')||'[]')
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: #c00000;
  }

  .search-container {
    .search-results {
      padding: 0 5px;

      .search-results-item {
        display: flex;
        padding: 13px 0;
        border-bottom: 1px solid #efefef;

        .result_text {
          white-space: nowrap;
          overflow: hidden;
          // 文本溢出后，使用 ... 代替
          text-overflow: ellipsis;
          margin-right: 3px;
        }
      }
    }

    .search-history {
      .history_title {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid #efefef;
      }

      .history-list {
        display: flex;

        uni-tag {
          margin: 5px;
        }
      }
    }
  }
</style>
