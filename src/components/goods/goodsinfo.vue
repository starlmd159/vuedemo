<template>
	<div id="tmpl">
	  	<silder :imgs="imgs"></silder>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import silder from "../subcom/silder";

export default {
  components: {
    silder
  },
  data() {
    return {
      id: 0, //表示商品id
      imgs: []
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getimgs();
  },
  methods: {
    getimgs() {
      var url = "/api/getthumimages/" + this.id;
      this.$axios.get(url).then(res => {
		var data = res.data;
		this.imgs = data.message
      });
    }
  }
};
</script>

<style scoped>

</style>