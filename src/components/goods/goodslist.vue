<template>
  <div id='tmpl'>
    <div id="mui-content" class="mui-content" style="background-color:#fff">
      <ul class="mui-table-view mui-grid-view">
        <li v-for="(item,index) in list" :key="index" class="mui-table-view-cell mui-media mui-col-xs-6">
          <router-link v-bind="{to:'/goods/goodsinfo/'+item.id}">
            <img class="mui-media-object" :src="item.img_url">
            <div class="mui-media-body" v-text="item.title"></div>
            <div class="desc">
              <p>
                <span>￥{{item.sell_price}}</span>
                <s>￥{{item.market_price}}</s>
              </p>
              <p>
                <h6 class="left">热卖中</h6>
                <h6 class="right">剩余{{item.stock_quantity}}件</h6>
              </p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>

    <!--3.0 实现获取更多按钮-->
    <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      list: [],
      pageindex: 1
    };
  },
  methods: {
    getlist(pageindex) {
      pageindex = pageindex || 1;
      var url = "/api/getgoods?pageindex=" + pageindex;
      this.$axios.get(url).then(res => {
        var data = res.data;
        this.list = this.list.concat(data.message);
      });
    },
    //加载更多
    getmore() {
      this.pageindex++;
      this.getlist(this.pageindex);
    }
  },
  created() {
    this.getlist();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mui-content {
  width: 100%;
  box-sizing: border-box;
}

.mui-col-xs-6 {
  width: 49%;
}
#mui-content li {
  border: 1px solid rgba(0, 0, 0, 0.4);
  padding: 0px;
  margin-left: 11px;
  margin-top: 6px;
}

#mui-content .mui-media-body {
  color: #0094ff;
}

#mui-content .desc {
  height: 60px;
  background-color: rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  padding: 5px;
  text-align: left;
}
#mui-content .desc span {
  color: red;
  margin-right: 15px;
}
#mui-content a {
  padding-left: 0px;
  margin-left: 0px;
}

#mui-content .desc .right {
  position: absolute;
  right: 10px;
  bottom: 0px;
}

#mui-content .desc .left {
  position: absolute;
  left: 10px;
  bottom: 0px;
}
</style>
