<template>
  <div id="home">
    <div ref="list" class="list">
      <div
        v-for="(item, index) in articleList"
        :key="item._id"
        :class="[index % 2 === 0 ? 'right' : 'left', 'one']"
      >
        <div v-if="isCover" class="avatar">
          <img :src="item.cover | URL" alt>
        </div>
        <div class="article">
          <div class="title" @click="link(item._id)">{{ item.title }}</div>
          <div class="preface">
            <p v-html="item.content" />
            <span @click="link(item._id)">继续阅读</span>
          </div>
          <div class="info">
            <span>
              <i class="icon el-icon-alarm-clock" />
              {{ item.createAt | dateFormat }}
            </span>
            <span>
              <i>|</i>
            </span>
            <span v-if="item.label">
              <i class="icon el-icon-tickets" />
              <span>{{ item.label.title }}</span>
              <span>
                <i class="icon el-icon-view" />
                {{ item.meta.views }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <!-- pager-count只要5~21之间的奇数 -->
    <el-pagination
      :pager-count="5"
      background
      layout="prev, pager, next"
      :current-page="page.nowPage"
      :page-size="page.size"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { searchArticle } from '@/api/article'
import bus from '@/untils/eventBus'
export default {
  data() {
    return {
      articleList: [],
      page: {
        nowPage: 1,
        size: 6
      },
      total: 0,
      isCover: true,
      key: ''
    }
  },
  computed: {
    urlPage() {
      if (this.$route.query.page) {
        const page = this.$route.query.page - 0
        return page
      }
      if (this.$route.path.split('/')[1] !== 'home') {
        return this.page.nowPage
      }
      return 1
    },
    KeyWords() {
      if (this.$route.query.KeyWords) {
        const KeyWords = this.$route.query.KeyWords
        return KeyWords
      }
      if (this.$route.path.split('/')[1] !== 'home') {
        return this.key
      }
      return ''
    }
  },
  watch: {
    KeyWords(value) {
      this.key = value
      this.getArticle()
    },
    urlPage(value) {
      this.page.nowPage = this.urlPage
      // 初始化数据，防止滚动时，数据残留
      this.initData()
    }
  },
  created() {
    this.initData()
  },
  mounted() {
    // bus.$on('searchKey', (value) => {
    //   this.KeyWords = value
    // })
    const _this = this
    window.addEventListener('resize', function() {
      if (document.body.clientWidth <= 920) {
        _this.isCover = false
      } else {
        _this.isCover = true
      }
    })
  },
  methods: {
    initData() {
      this.page.nowPage = this.urlPage
      this.getArticle()
      bus.$emit('title', '')
    },
    // 获取文章
    getArticle() {
      // 可以带上关键词查找
      this.page.searchKey = this.KeyWords
      searchArticle(this.page).then((res) => {
        const { data } = res
        this.total = data.total
        this.articleList = data.records
        window.scroll(0, 0)
      })
    },
    // currentPage 改变时会触发 当前页
    handleCurrentChange(page) {
      this.page.nowPage = page
      if (this.KeyWords !== '' && this.KeyWords) {
        this.$router.push({
          path: '/home',
          query: { page, KeyWords: this.KeyWords }
        })
        return
      }
      this.$router.push({ path: '/home', query: { page }})
    },
    link(id) {
      this.$router.push(`/article/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 920px) {
  .one .avatar {
    display: none;
  }
}
.one {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;
  .avatar {
    flex: 2;
    overflow: hidden;
    max-height: 200px;
    border-radius: 4%;
    text-align: center;
    img {
      width: 100%;
      height: 100%;
      border-radius: 4%;
      object-fit: cover;
      transition: all 1s ease-out;
    }
  }
  .avatar img:hover {
    transform: scale(1.2);
  }
  .article {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      margin-bottom: 15px;
      font-size: 20px;
      cursor: pointer;
    }
    .preface {
      flex: 1;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 1px;
        line-height: 30px;
        margin-bottom: 5px;
      }
      span {
        color: #23527c;
        cursor: pointer;
      }
      span:hover {
        color: #b200a3;
      }
    }
    .info {
      margin-top: 10px;
      span {
        margin-right: 10px;
        font-size: 14px;
        .icon {
          margin-right: 4px;
        }
      }
    }
  }
}
.left {
  .avatar {
    margin-right: 30px;
    box-shadow: 12px 16px 25px -12px rgba(0, 0, 0, 0.56);
  }
}
.right {
  flex-direction: row-reverse;
  .avatar {
    margin-left: 30px;
    box-shadow: -12px 16px 25px -12px rgba(0, 0, 0, 0.56);
  }
}
</style>
