<template>
  <div class="box1">
    <div class="info">
      <div class="title"><i /><span>关于我</span></div>
      <div class="body">
        <div>
          <img :src="info.icon | URL" alt="">
          <h4>{{ info.Name }}</h4>
        </div>
        <div>
          <ul>
            <li>90后肥宅，喜欢美剧、玩主机游戏、CSGO、写写代码</li>
            <li>目前还没有找到工作，现在主要时学习。前端框架用的是Vue.js。自己的后端用的node.js</li>
            <li>目前所掌握的知识还是有欠缺的</li>
            <li>想学习视频剪辑，不过现在并没有去学习的打算</li>
            <li>等找到工作，再改改</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="title"><i /><span>关于本站</span></div>
      <div>
        <p>本站当初建立，主要是自己为了使用新学的技术，以及自己动手写个属于自己的项目。项目改版了几次，感觉自己还有好多东西学习，自己会在之后的学习中把一些自己觉得不错知识，总结下。欢迎访问 我的博客</p>
        <p>博客界面有些丑，但是暂时不打算改了。ui我参考了一些其他博客的。</p>
      </div>
      <div class="skill">
        <h3>本站所使用的技术栈</h3>
        <ul>
          <li>前端：vue.js</li>
          <li>后端：Vue.js + ElementUI</li>
          <li>服务端：node.js</li>
          <li>数据库：mongodb</li>
          <!-- <li>本站源码：Koa2-nuxt-MySQL</li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getsetting } from '@/api/article'
export default {
  data() {
    return {
      info: {}
    }
  },
  computed: {
    baseUrl() {
      return this.$store.state.baseURL
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      getsetting().then((res) => {
        this.info = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box1 {
  margin: 0 10px;
}
.info {
  .skill {
    margin-top: 30px;
    h3 {
      margin-bottom: 15px;
      font-size: 16px;
    }
    li {
      margin-bottom: 10px;
    }
  }
  p {
    font-size: 14px;
    line-height: 25px;
    text-indent: 20px;
  }
  .title {
    text-align: center;
    font-size: 16px;
    position: relative;
    padding: 15px 0;
    i {
      display: block;
      width: 100%;
      border-bottom: 1px solid #7f828b;
      position: absolute;
      top: 50%;
      z-index: -1;
    }
    span {
      position: relative;
      z-index: 2;
      padding: 0 15px;
      background-color: #fff;
    }
  }
  .body {
    display: flex;
    margin-left: 40px;
    h4 {
      font-size: 14px;
      text-align: center;
    }
    img {
      width: 80px;
    }
    div {
      margin: 0 10px;
    }
    li {
      font-size: 14px;
      padding: 5px 0;
    }
  }
}
</style>
