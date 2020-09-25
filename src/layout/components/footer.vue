<template>
  <div id="footer">
    <div>
      <ul>
        <li>
          <span class="date"><i class="el-icon-bangzhu" />{{ date }}</span>
          <span class="name"><i class="el-icon-user-solid" /></span>
          <span class="line"><i>|</i></span>
          <span class="ariticleTotal"><i class="el-icon-s-marketing" />xxxK</span>
        </li>
        <li>
          <span class="date"><i class="el-icon-user-solid" />本站总访客数 {{ statistics.Pageviews }}人</span>
          <span class="line"><i>|</i></span>
          <span class="name"><i class="el-icon-star-on" />文章总阅读量 {{ statistics.ArticleViews }} 次</span>
        </li>
        <li>
          <span><a href="http://beian.miit.gov.cn" target="_blank">豫ICP备20014199号-1</a></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getStatistics, putStatistics } from '@/api/article'
export default {
  data() {
    return {
      statistics: {}
    }
  },
  computed: {
    date() {
      const date = new Date()
      return date.getFullYear()
    }
  },
  created() {
    this.putStatistics()
    this.getStatistics()
  },
  methods: {
    getStatistics() {
      getStatistics().then((res) => {
        this.statistics = res.data
        if (!window.sessionStorage.getItem('views')) {
          window.sessionStorage.setItem('views', res.data._id)
        }
      })
    },
    // 修改网站统计数据
    putStatistics() {
      if (!window.sessionStorage.getItem('views')) {
        // 修改网站访问量 +1
        putStatistics().then((res) => {
          console.log(res)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#footer {
  width: 100%;
  min-height: 60px;
  text-align: center;
  li {
    margin-bottom: 6px;
    span {
      color: #999999 !important;
      font-size: 14px;
      a {
        color: #999999 !important;
      }
      i {
        padding: 0 7px;
      }
      .line {
        width: 0;
        height: 100%;
        background-color: #999999;
      }
    }
  }
}
</style>
