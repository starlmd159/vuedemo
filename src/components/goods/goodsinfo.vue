<template>
	<div id="tmpl">
	  	你好{{id}}
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
// 代表vm
export default{
	data(){
		return {
			id:0
		}
	},
	created(){
		this.id = this.$route.params.id
	}

}

</script>

<style scoped>

</style>