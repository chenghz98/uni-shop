<template>
	<view class="my-search-container" :style="{'background-color':bgColor}">
		<view class="my-search-box" :style="{'border-radius':radius+'px'}" @click="searchBoxHandler ">
		  <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索...</text>
		</view>
	</view>
</template>

<script>
	export default {
    props:{
      bgColor:{
        type:String,
        default:'#c00000',
      },
      radius:{
        type:Number,
        default:18,
      }
    },
		data() {
			return {
				
			};
		},
    methods:{
      searchBoxHandler(){
        this.$emit('searchClick')
      }
    }
	}
</script>

<style lang="scss">
.my-search-container{
  height: 50px;
  // background-color: #c00000;
  padding: 0 10px;
  display: flex;
  align-items: center;
}
.my-search-box{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 36px;
    background-color: #fff;
    // border-radius: 18px;
    .placeholder{
      font-size: 16px;
      margin-left: 10px;
    }
  }
</style>
