<template>
  <div id="side" ref="side">
    <!-- 热门文章 -->
    <div class="hot box-side">
      <h3>热门文章</h3>
      <ul>
        <li v-for="(item, index) in hot" :key="index">
          <router-link class="link" :to="'/article/' + item._id">
            <i>{{ index + 1 }}</i>
            <span>{{ item.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 文章分类 -->
    <div class="sort box-side">
      <h3>#分类</h3>
      <ul>
        <li v-for="item in sort" :key="item._id" @click="sortArticle(item._id)">
          <span>#{{ item.title }}</span>
        </li>
      </ul>
    </div>
    <!-- 目录 -->
    <div
      v-if="title === null || title === '' ? false : true"
      ref="contents"
      class="contents"
      v-html="title"
    />
  </div>
</template>

<script>
import { getHot, getALLSort } from '@/api/article'
import bus from '@/untils/eventBus'
export default {
  data() {
    return {
      hot: [],
      sort: [],
      title: '',
      // 暂存title
      cacheTitle: ''
    }
  },
  watch: {
    title() {
      this.$nextTick(() => {
        if (this.title !== '' && this.title) {
          var a = [...document.querySelectorAll('.contents a')]
          a.forEach((item, index) => {
            item.addEventListener('click', function() {
              var data = item.getAttribute('data')
              var id = document.querySelector(data)
              var top = id.getBoundingClientRect().top + window.pageYOffset - 60
              window.scrollTo({
                top,
                left: 0,
                behavior: 'smooth'
              })
            })
          })
        }
      })
      this.titlePosition()
    },
    hot() {
      if (this.hot.length === 0 || this.sort.length === 0) {
        return
      }
      this.titlePosition()
    },
    sort() {
      if (this.hot.length === 0 || this.sort.length === 0) {
        return
      }
      this.titlePosition()
    }
  },
  created() {
    this.initData()
  },
  mounted() {
    bus.$on('title', (value) => {
      const title = value.replace(/href/g, 'data')
      this.cacheTitle = title
      console.log(title)
      this.onResize()
    })
  },
  methods: {
    // 初始化数据
    initData() {
      getHot().then((res) => {
        this.hot = res.data
      })
      getALLSort().then((res) => {
        this.sort = res.data
      })
    },
    // 搜索分类文章
    sortArticle(id) {
      this.$router.push({ path: `/sort/${id}` })
    },
    // 监听title及定位
    titlePosition() {
      if (this.hot.length === 0 || this.sort.length === 0) {
        return
      }
      if (this.title !== null && this.title !== '') {
        this.$nextTick(() => {
          const contents = document.querySelector('.contents')
          const Parent = this.$refs.side
          const width = Parent.offsetWidth
          let page = ''
          // offsetTop最近的parent的元素，parent具有定位的或者 table,td,th,body元素
          if (contents.offsetTop !== 0) {
            page = contents.offsetTop
          }
          document.onscroll = function() {
            if (window.pageYOffset >= page && page !== null) {
              contents.style.position = 'fixed'
              contents.style.top = Parent.offsetTop + 'px'
              contents.style.width = width + 'px'
            } else {
              contents.style.position = 'relative'
              contents.style.top = '0'
            }
          }
        })
      }
    },
    // 监听屏幕大小
    onResize() {
      const _this = this
      if (document.body.clientWidth > 920) {
        this.title = this.cacheTitle
      } else {
        this.title = ''
      }
      this.titlePosition()
      window.addEventListener('resize', function() {
        if (document.body.clientWidth > 920) {
          _this.title = _this.cacheTitle
        } else {
          _this.title = ''
        }
      })
    }
    // 处理title优化锚点定位
    // sideTitle() {
    //   if (this.title !== null && this.title !== '') {
    //     this.$nextTick(() => {
    //       const contens = document.querySelector('.contnets')
    //       // const a = contens.children
    //       console.log(contens)
    //     })
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 921px) {
  #side {
    z-index: 2100;
  }
}
#side {
  position: relative;
}
h3 {
  font-size: 16px;
  padding-bottom: 20px;
  border-bottom: 1px solid #c0c4cc;
  text-indent: 15px;
}
.hot {
  margin-bottom: 30px;
  li {
    padding: 10px 0 10px 15px;
    .link {
      display: flex;
      align-items: center;
      white-space: nowrap;
      overflow: hidden;
    }
    i {
      display: inline-block;
      width: 20px;
      height: 20px;
      background-color: #7f828b;
      text-align: center;
      line-height: 20px;
      color: #ffffff;
      font-size: 14px;
      margin-right: 10px;
    }
    span {
      max-width: 80%;
      display: inline-block;
      font-size: 14px;
      transition: transform 0.2s ease;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    span:hover {
      color: indianred;
      transform: translateX(10px);
    }
  }
}
.sort {
  margin-bottom: 20px;
  h3 {
    margin-bottom: 10px;
  }
  ul {
    padding-left: 15px;
    display: flex;
    flex-wrap: wrap;
    li {
      font-size: 14px;
      padding: 4px;
      margin-right: 5px;
      margin-bottom: 5px;
      text-align: center;
      border: 1px solid #c0c4cc;
    }
    li:hover {
      background-color: indianred;
      cursor: pointer;
    }
  }
}
</style>
