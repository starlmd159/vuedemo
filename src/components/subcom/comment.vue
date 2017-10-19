<template>
  <div id='tmpl'>
    <!--提交评论部分-->
    <div class="postcomment">
      <h3>提交评论</h3>
      <p class="p"></p>
      <textarea placeholder="请输入您要评论的内容..." v-model="postcontent"></textarea>
      <mt-button type="primary" size="large" @click="postcomment">发表</mt-button>
    </div>
    <!--显示评论部分-->
    <div id="list">
      <h3>评论列表</h3>
      <p class="p"></p>
      <div v-for="(item,index) in list">
        <div class="title">
          <span>第{{index + 1}}楼:</span>
          <span>用户：{{item.user_name}}</span>
          <span>发表时间：{{item.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
        </div>
        <ul class="mui-table-view">
          <li class="mui-table-view-cell" v-text="item.content"></li>
        </ul>
      </div>
    </div>
    <!--3.0 实现获取更多按钮-->
    <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  export default {
    props: ['id'],
    data () {
      return {
        // 用户自动获取用户评论内容
        postcontent: '',
        list: [],
        pageindex: 1
      }
    },
    methods: {
      postcomment(){
        // 判断用户是否评论内容
        if (this.postcontent.trim().length <= 0) {
          Toast("您要评论的内容为空");
          return;
        }
        var url = '/api/postcomment/' + this.id;
        this.$axios.post(url, {content : this.postcontent})
          .then((res) => {
            console.log(res)
            var data = res.data;
            Toast(data.message);
            this.list = [{
              "user_name": "匿名用户",
              "add_time": new Date(),
              "content": this.postcontent
            }].concat(this.list);
            //	4.0 将文本框中的评论内容清空
            this.postcontent = '';
          }).catch((err) => {
          console.log(err)
        })
      },
      //获取评论数据
      getcommentlist(pageindex){
        pageindex = pageindex || 1 ;
        var url = '/api/getcomments/'+this.id+'?pageindex='+pageindex ;
        this.$axios.get(url).then((res) => {
          var data = res.data;
          this.list = this.list.concat(data.message);
        })
      },
      //点击加载更多
      getmore(){
        this.pageindex++
        this.getcommentlist(this.pageindex)
      }
    },
    created () {
      this.getcommentlist(this.pageindex);
    }
  }
</script>
<style scoped>
  /* 1.0 实现提交评论样式 */
  #postcomment{
    padding: 5px;
  }
  .p{
    height: 1px;
    width: 100%;
    border-bottom: 1px solid rgba(0,0,0,0.3);
  }

  /*2.0 评论列表的样式*/
  #list{
    padding: 5px;
  }
  .title{
    padding: 5px;
    color: #6d6d72;
    font-size: 15px;
    background-color: rgba(0,0,0,0.1);
  }
</style>
