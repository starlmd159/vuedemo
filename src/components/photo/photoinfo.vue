<template>
  <div id='tmpl'>
    <div id="desc">
      <!--图片详情- 标题部分-->
      <div class="title">
        <h4>{{photoinfo.title}}</h4>
        <p>
          {{photoinfo.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}  {{photoinfo.click}}次浏览
        </p>
        <p class="line"></p>
      </div>

      <!--缩略图-->
      <div class="mui-content">
        <ul class="mui-table-view mui-grid-view mui-grid-9">
          <li  v-for="(item, index) in list" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <img class="preview-img"  :src="item.src" height="100" @click="$preview.open(index, list)"
                 >
          </li>
        </ul>
      </div>

      <!--图片详情- 摘要部分-->
      <p v-html="photoinfo.content"></p>
    </div>

    <!--2.0。3 集成评论组件-->
    <div id="comment">
      <comment :id="id"></comment>
    </div>

  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  import comment from '../subcom/comment.vue';

  export default {
    components: {
      comment
    },
    data() {
      return {
        id:0,
        photoinfo: {},
        list: []
      }
    },
    methods: {
      getinfo(){
        var url = '/api/getimageInfo/'+this.id
        this.$axios.get(url).then((res) => {
          var data = res.data
          console.log(data)
          this.photoinfo = data.message[0]
        })
      },
      getimgs(){
        var url ='/api/getthumimages/'+this.id;
        this.$axios.get(url).then((res) => {
          var data = res.data;
          data.message.forEach((item) => {
            var img = document.createElement('img');
            img.src = item.src;
            item.h = img.height;
            item.w = img.width;
          });
          this.list = data.message;
        })
      }
    },
    created() {
      this.id = this.$route.params.id;
      this.getinfo();
      this.getimgs()
    }
  }
</script>
<style scoped>
  /*图片详情样式*/
  #desc{
    padding: 10px;
  }
  #desc  .title h4{
    color: #0094ff;
  }

  #desc .title p{
    color:rgba(0,0,0,0.4);
    margin-top: 10px;
  }

  #desc .title .line{
    width: 100%;
    height: 1px;
    border-bottom: 1px solid rgba(0,0,0,0.4);
  }

  .mui-content,.mui-content ul{
    background-color: #fff;
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border-right:0px;
    border-bottom:0px;
  }
  .mui-grid-view.mui-grid-9{
    border-top:0px;
    border-left:0px;
  }
</style>
