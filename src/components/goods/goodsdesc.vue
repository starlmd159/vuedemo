<template>
	<div id="tmpl">
        <h5 v-text="info.title"></h5>
		<p class="line"></p>
		<p class="page" v-html="info.content"></p>
	</div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      id: 0,
      info: {}
    };
  },
  methods: {
    getinfo() {
      var url = "/api/goods/getdesc/" + this.id;
      this.$axios.get(url).then(res => {
        var data = res.data;
        this.info = data.message[0];
      });
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getinfo();
  }
};
</script>

<style scoped>
#tmpl {
  padding: 5px;
}
#tmpl h5 {
  color: #0094ff;
  font-weight: 900;
}

#tmpl .line {
  height: 1px;
  border: 1px solid rgba(0, 0, 0, 0.3);
}
</style>