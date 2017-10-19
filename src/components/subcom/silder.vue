<template>
	<div id="tmpl">
		<mt-swipe :auto="2000">
			<mt-swipe-item v-for="(item,index) in imgs" :key="index">
				<img :src="item.img">
			</mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
export default {
  props: ["imgs"],//用来接收父组件传入过来的数据
};
</script>

<style scoped>
 .mint-swipe {
    width: 100%;
    height: 195px;
  }

  .mint-swipe img {
    width: 100%;
    height: 100%;
  }

</style>