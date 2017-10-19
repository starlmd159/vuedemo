<template>
  <div id='tmpl'>
    <div class="title">
      <h4 v-text="info.title"></h4>
      <p>{{info.add_time | datefmt('YYYY-MM-DD')}} {{info.click}}次浏览</p>
    </div>
    <div id="content" v-html="info.content">
    </div>
    <!--实现评论组件-->
    <comment :id='id'></comment>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  import comment from '../subcom/comment.vue'
  export default {
    data() {
      return {
        id: 0,
        info:{}
      }
    },
    components:{
      comment
    },
    methods: {
      getinfo(){
        var url = '/api/getnew/'+this.id;
        this.$axios.get(url).then((res) => {
          var data = res.data
          this.info = data.message[0]
        })
      }
    },
    created() {
      this.id = this.$route.params.id;
      this.getinfo()
    }
  }
</script>
<style scoped>
  .title h4{
    color: #0094ff;
  }
  .title p{
    color:rgba(0,0,0,0.5);
  }

  .title,.content{
    padding: 5px;
  }
</style>
