<template>
  <div id='tmpl'>
    <!--分类-->
    <div id='cate'>
      <ul v-bind="{style:'width:' + ulWidth + 'px'}">
        <li @click='getimages(0)'>全部</li>
        <li v-for='(item,index) in cates' :key="index" @click='getimages(item.id)'>{{item.title}}</li>
      </ul>
    </div>
    <!--图片列表-->
    <div id="imglist">
      <ul>

          <li v-for="(item,index) in list" :key="index">
            <router-link v-bind="{to:'/photo/photoinfo/'+item.id}">
            <img v-lazy="item.img_url">
            <div id="desc">
              <h5 v-text="item.title"></h5>
              <p v-text="item.zhaiyao"></p>
            </div>
            </router-link>
          </li>

      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        ulWidth: 375,
        cates: [],
        list: []
      }
    },
    methods: {
      getcates() {
        var url = '/api/getimgcategory';
        this.$axios.get(url).then((res) => {
          var data = res.data;
          this.cates = data.message;
          //动态计算ul的宽度
          var w = 82
          var count = data.message.length + 1;
          this.ulWidth = w * count;
        })
      },
      //加载图片
      getimages(cateid) {
        cateid = cateid || 0;
        var url = '/api/getimages/' + cateid;
        this.$axios.get(url).then((res) => {
          var data = res.data
          this.list = data.message
        })
      }
    },
    created() {
      this.getcates()
      this.getimages(0);
    }
  }
</script>
<style scoped>
  #cate {
    padding: 5px;
    border-bottom: 1px solid #b8bbbf;
    max-width: 100%;
    overflow-x: auto;
  }

  #cate ul {
    font-size: 0px;
  }

  #cate ul li {
    cursor: pointer;
    box-sizing: border-box;
    display: inline-block;
    margin-right: 3px;
    font-size: 14px;
    height: 33px;
    line-height: 33px;
    padding: 0 12px;
    color: #0094ff;
    background-color: #f6f8fa;
    box-shadow: 0 0 1px #b8bbbf;
  }

  /*实现图片列表样式*/
  #imglist {

  }

  #imglist ul {
    padding-left: 0px;
  }

  #imglist li {
    list-style: none;
    position: relative;
  }

  #imglist img {
    width: 100%;
    height: 300px;
  }

  #desc {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    bottom: 2px;
    left: 0px;
  }

  #desc h5 {
    color: #ffffff;
    font-weight: bold;
  }

  #desc p {
    color: #fff;
  }

  image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
  }
</style>
