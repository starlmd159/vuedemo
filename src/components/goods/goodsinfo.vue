<template>
	<div id="tmpl">
    <div id="silder">
      <silder :imgs="imgs"></silder>
    </div>
    <div id="buy">
			<h5 v-text="info.title"></h5>
			<p class="line"></p>
			<ul>
				<li class="price">
					市场价: <s>￥{{info.market_price}}</s> &nbsp;&nbsp;&nbsp;&nbsp; 销售价：<span>￥{{info.sell_price}}</span>
				</li>
				<li class="inputli">
					购买数量：<inputNumber class="inputnumber" v-on:dataobj="getcount"></inputNumber>
				</li>
				<li>
					<mt-button type="primary" size="small">立即购买</mt-button>
					<mt-button type="danger" size="small">加入购物车</mt-button>
				</li>
			</ul>
		</div>

		<div id="params">
				<h6>商品参数</h6>
				<p class="line"></p>
			<ul>
				<li>商品货号：{{info.goods_no}}</li>
				<li>库存情况：{{info.stock_quantity}}</li>
				<li>上架时间：{{info.add_time | datefmt('YYYY-MM-DD')}}</li>
			</ul>
		</div>

		<!--3.0 图文详情-->
		<!--4.0 商品评论-->
		<div id="other">
      <!--3.0 图文详情--> 
      <router-link v-bind="{to:'/goods/goodsdesc/'+id}">
        <mt-button class="imgdesc" type="primary" size="large">图文详情</mt-button>
      </router-link>
      <!--4.0 商品评论-->
      <router-link v-bind="{to:'/goods/goodscomment/'+id}">
      	<mt-button type="danger" size="large">商品评论</mt-button>
      </router-link>
		</div>
	</div>
  
</template>

<script>
import { Toast } from "mint-ui";
import silder from "../subcom/silder";
import inputNumber from "../subcom/inputNumber";

export default {
  components: {
    silder,
    inputNumber
  },
  data() {
    return {
      id: 0, //表示商品id
      imgs: [],
      info: [],
      inputNumberCount: 1
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getimgs();
    this.getinfo();
  },
  methods: {
    getimgs() {
      var url = "/api/getthumimages/" + this.id;
      this.$axios.get(url).then(res => {
        var data = res.data;
        this.imgs = data.message;
      });
    },
    getinfo() {
      var url = "/api/goods/getinfo/" + this.id;
      this.$axios.get(url).then(res => {
        var data = res.data;
        this.info = data.message[0];
      });
    },
    getcount(count) {
      this.inputNumberCount = count;
    }
  }
};
</script>

<style scoped>
.silder {
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  margin: 5px;
}
#buy,
#params,
#other {
  margin: 5px;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 5px;
}
.line {
  height: 1px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
#buy ul,
#params ul {
  padding-left: 0px;
}
#buy h5 {
  color: #0094ff;
  padding: 5px;
  font-family: "微软雅黑";
  font-weight: 900;
}
#buy li,
#params li {
  list-style: none;
  padding: 8px;
  font-size: 14px;
}

#buy .price span {
  color: red;
}

#other .imgdesc {
  margin-bottom: 20px;
}

.inputli {
  position: relative;
}
.inputnumber {
  position: absolute;
  left: 100px;
  top: 5px;
}
</style>