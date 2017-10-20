import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/Home'
import newslist from '@/components/news/newslist'
import newsinfo from '@/components/news/newsinfo'
import photolist from '@/components/photo/photolist'
import photoinfo from '@/components/photo/photoinfo'
import goodslist from '@/components/goods/goodslist'
import goodsinfo from '@/components/goods/goodsinfo'
import goodsdesc from '@/components/goods/goodsdesc'
import goodscomment from '@/components/goods/goodscomment'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'mui-active',
  routes: [
    {
      path:'/',
      redirect: 'home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/news/newslist',
      name: 'newslist',
      component: newslist
    },
    {
      path: '/news/newsinfo/:id',
      name: 'newsinfo',
      component: newsinfo
    },
    {
      path: '/photo/photolist',
      name: 'photolist',
      component: photolist
    },
    {
      path: '/photo/photoinfo/:id',
      name: 'photoinfo',
      component: photoinfo
    },
    {
      path: '/goods/goodslist',
      name: 'goodslist',
      component: goodslist
    },
    {
      path: '/goods/goodsinfo/:id',
      name: 'goodsinfo',
      component: goodsinfo
    },
    {
      path: '/goods/goodsdesc/:id',
      name: 'goodsdesc',
      component: goodsdesc
    },
    {
      path: '/goods/goodscomment/:id',
      name: 'goodscomment',
      component: goodscomment
    },
  ]
})
