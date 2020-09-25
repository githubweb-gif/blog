<template>
  <div id="home">
    <transition-group mode="out-in" name="fade">
      <div
        v-for="(item, index) in articleList"
        :key="item._id"
        :class="[index % 2 === 0 ? 'left' : 'right', 'one']"
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
              {{ item.updateAt | dateFormat }}
            </span>
            <span>
              <i>|</i>
            </span>
            <span>
              <i class="icon el-icon-tickets" />
              <span>{{ item.sorts.title }}</span>
              <span>
                <i class="icon el-icon-view" />
                {{ item.meta.views }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </transition-group>
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
import { getSortArticle } from '@/api/article'
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
      oldId: ''
    }
  },
  computed: {
    sortId() {
      const id = this.$route.params.sortID
      if (id && id !== '') {
        if (this.oldId !== id) {
          return id
        } else {
          return this.oldId
        }
      }
      return ''
    },
    urlPage() {
      if (this.$route.path.split('/')[1] !== 'solt') {
        return this.page.nowPage
      }
      if (this.$route.query.page) {
        const page = this.$route.query.page - 0
        return page
      }
      return 1
    }
  },
  watch: {
    sortId(value) {
      if (value === this.oldId) {
        return
      }
      this.initData()
    },
    urlPage(value) {
      this.page.nowPage = this.urlPage
      this.initData()
    }
  },
  created() {
    window.sessionStorage.removeItem('sortID')
    this.initData()
  },
  mounted() {
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
      this.getSortArticle()
      bus.$emit('title', '')
    },
    // 获取标签文章
    getSortArticle() {
      const sort = {
        page: this.page,
        id: this.sortId
      }
      getSortArticle(sort).then((res) => {
        this.total = res.data.total
        this.articleList = res.data.records
      })
    },
    // currentPage 改变时会触发 当前页
    handleCurrentChange(page) {
      this.page.nowPage = page
      this.$router.push({
        path: `/sort/${this.sortId}`,
        query: { page: this.page.nowPage }
      })
      this.getSortArticle()
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
    box-shadow: -12px 16px 38px -12px rgba(0, 0, 0, 0.56);
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
  flex-direction: row-reverse;
  .avatar {
    margin-left: 30px;
  }
}
.right {
  .avatar {
    margin-right: 30px;
  }
}
.fade-enter-active
 {
  transition: all 1s;
}
.fade-enter {
  opacity: 0;
}
</style>
