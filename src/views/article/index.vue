<template>
  <div v-if="article" id="articleContent">
    <div class="top">{{ article.title }}</div>
    <div class="info">
      <div class="infolist">
        <span>
          <i class="el-icon-alarm-clock" />
          {{ article.createAt | dateFormat }}
        </span>
        <span>
          <i>|</i>
        </span>
        <span class="line">
          <i class="el-icon-tickets" />
          <span>{{ article.sorts.title }}</span>
        </span>
        <span class="line">
          <i class="el-icon-view" />
          <span>{{ article.meta.views }}</span>
        </span>
      </div>
    </div>
    <p
      ref="title"
      v-copy
      v-highlight
      class="content contentArticle"
      v-html="article.content"
    />
  </div>
</template>

<script>
import Prism from 'prismjs'
import { getArticle, addViews } from '@/api/article'
import bus from '@/untils/eventBus'
export default {
  directives: {
    // 自定义指令 code高亮
    highlight: {
      bind: function(el) {
        var blocks = el.querySelectorAll('pre > code')
        blocks.forEach((block) => {
          Prism.highlightElement(block)
        })
      }
    },
    // 一键复制
    copy: {
      bind: function(el) {
        var input = document.createElement('input')
        input.className = 'inputcopy'
        var code = el.querySelectorAll('code')
        var pre = el.querySelectorAll('pre')
        if (code.length === 0 || pre.length === 0) {
          return
        }
        pre[0].appendChild(input)
        pre.forEach((item, index) => {
          var span = document.createElement('span')
          span.innerText = '复制'
          item.onmouseover = function() {
            span.style.display = 'block'
          }
          item.onmouseout = function() {
            span.style.display = 'none'
          }
          span.className = 'copy';
          (function(index) {
            span.onclick = function() {
              const text = code[index].innerText
              input.value = text
              input.select()
              document.execCommand('Copy')
              this.innerText = '复制成功'
              var that = this
              setTimeout(function() {
                that.innerText = '复制'
              }, 600)
            }
          })(index)
          item.appendChild(span)
        })
      }
    }
  },
  data() {
    return {
      article: null,
      num: '',
      mulv: ''
    }
  },
  computed: {
    id() {
      if (this.$route.params.id) {
        return this.$route.params.id
      }
      return false
    }
  },
  watch: {
    id() {
      this.getArticle()
    }
  },
  beforeCreate() {},
  created() {
    window.scroll(0, 0)
    this.getArticle()
  },
  mounted() {
    this.lookViews()
  },
  methods: {
    // 获取id文章
    getArticle() {
      if (this.id) {
        getArticle(this.id).then((res) => {
          this.article = res.data.article
          this.num = res.data.article.meta.views
          this.articleTitle()
          this.$emit('loading', false)
        })
      }
    },
    // 阅读数+1
    lookViews() {
      // 阅读加1延迟2s
      window.setTimeout(() => {
        if (this.id) {
          addViews(this.id).catch((err) => {
            console.log(err)
          })
        }
      }, 2000)
    },
    // 文章目录
    articleTitle() {
      this.$nextTick(() => {
        // 获取目录
        var title = this.$refs.title.children[0]
        // 目录是否存在
        if (title.className !== 'mce-toc') {
          return bus.$emit('title', '')
        } else {
          this.mulv = title.innerHTML
          bus.$emit('title', this.mulv)
          title.innerHTML = ''
        }
      })
    },
    // 滚动到顶部
    scrollTop() {
      this.$nextTick(() => {
        const title = this.$refs.title
        if (title.children) {
          window.scroll(0, 0)
        }
      })
      // setTimeout(() => {
      //   window.scroll(0, 0)
      // }, 400)
    }
  }
}
</script>

<style lang="scss" scoped>
#articleContent {
  width: 100%;
}
.el-breadcrumb {
  border-bottom: 1px solid #222222;
}
h2 {
  margin-bottom: 20px;
}
#articleContent {
  color: #555555;
  h2 {
    font-size: 16px !important;
    margin: 10px 0;
  }
  .top {
    font-size: 18px;
    margin-bottom: 15px;
    text-align: center;
  }
  p {
    font-size: 14px !important;
    margin-bottom: 10px;
    line-height: 2;
  }
  .info {
    text-align: center;
    min-height: 17px;
    margin-bottom: 10px;
    .infolist {
      .line {
        span {
          border-bottom: 1px solid #555555;
        }
      }
      white-space: pre;
      font-size: 12px;
      margin-right: 10px;
      i {
        margin: 0 5px;
      }
    }
  }
}
</style>
