<template>
  <div id="header">
    <!-- 大屏布局 -->
    <nav v-if="!isMobile" class="common">
      <div class="logName" @click="link">
        <img :src="webInfo.icon | URL" alt>
        <div>{{ webInfo.name }}</div>
      </div>
      <div class="navbar__items">
        <div @click="link">首页</div>
        <router-link to="/archive"><div>归档</div></router-link>
        <router-link to="/about"><div>关于</div></router-link>
      </div>
      <div class="search">
        <div class="form">
          <input
            v-model="KeyWords"
            type="text"
            placeholder="输入文章关键字"
            @blur="serach"
            @keydown.enter="serach"
          >
          <button @click="serach">
            <i class="el-icon-search" />
          </button>
        </div>
      </div>
    </nav>
    <!-- 小屏幕布局 -->
    <div v-if="isMobile" ref="mobile" :style="ch" class="mobile common">
      <!-- log -->
      <div class="ss logName" @click.stop="link">
        <img :src="webInfo.icon | URL" alt>
        <div class="name">{{ webInfo.name }}</div>
        <div class="icon">
          <i class="el-icon-menu" @click.stop="navShow" />
        </div>
      </div>
      <div class="ss navbar__items">
        <div @click="link">首页</div>
        <router-link to="/archive" @click.native="ch.height = '60px'"><div>归档</div></router-link>
        <router-link to="/about" @click.native="ch.height = '60px'"><div>关于</div></router-link>
      </div>
      <div class="ss search">
        <div class="form">
          <input
            v-model="KeyWords"
            type="text"
            placeholder="输入文章关键字"
            @blur="serach"
            @keydown.enter="serach"
          >
          <button @click="serach">
            <i class="el-icon-search" />
          </button>
        </div>
      </div>
    </div>
    <!-- 阴影盒子 -->
    <div
      v-if="ch.height === '60px' ? false : true"
      class="shaow"
      @click.stop="navShow"
    />
  </div>
</template>

<script>
// import bus from '@/untils/eventBus'
import { getsetting } from '@/api/article'
export default {
  data() {
    return {
      webInfo: {
        name: '',
        icon: ''
      },
      KeyWords: '',
      isMobile: false,
      ch: {
        height: '60px'
      }
    }
  },
  created() {
    this.getWebInfo()
  },
  mounted() {
    if (document.body.clientWidth <= 920) {
      this.isMobile = true
    } else {
      this.ch.height === '60px'
    }
    // 性能要优化
    if (document.body.clientWidth <= 920) {
      document.addEventListener('scroll', function() {
        _this.ch.height = '60px'
      })
    }
    const _this = this
    window.addEventListener('resize', function() {
      if (document.body.clientWidth <= 920) {
        _this.isMobile = true
      } else {
        _this.ch.height = '60px'
        _this.isMobile = false
      }
    })
  },
  methods: {
    getWebInfo() {
      getsetting().then((res) => {
        this.webInfo.name = res.data.Name
        this.webInfo.icon = res.data.icon
      })
    },
    serach() {
      this.ch.height = '60px'
      if (this.KeyWords !== '' && this.KeyWords) {
        this.$router.push({ path: '/home', query: { page: 1, KeyWords: this.KeyWords }})
        return
      }
      this.$router.push({ path: '/home', query: { page: 1 }})
      // bus.$emit('searchKey', this.KeyWords)
    },
    link() {
      this.KeyWords = ''
      this.serach()
    },
    navShow() {
      const height = this.$refs.mobile.scrollHeight
      if (this.ch.height === '60px') {
        this.ch.height = height + 'px'
      } else {
        this.ch.height = '60px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#header {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #ecebf0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffffff;
  z-index: 3000;
  nav {
    height: 100%;
    max-width: 1140px;
    align-items: center;
    .logName {
      height: 100%;
      cursor: pointer;
    }
    .navbar__items {
      cursor: pointer;
      div {
        margin-right: 20px;
      }
    }
    .search {
      .form {
        height: 100%;
      }
    }
  }
}

.mobile {
  width: 100%;
  flex-direction: column;
  background-color: #ffffff;
  border-bottom: 1px solid #ecebf0;
  overflow: hidden;
  transition: all 0.3s;
  .logName {
    height: 60px;
    line-height: 60px;
    justify-content: space-between;
    .icon {
      flex: 1;
      text-align: right;
    }
    i {
      font-size: 25px;
    }
  }
  .navbar__items {
    flex-direction: column;
    div {
      cursor: pointer;
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      border-bottom: 1px solid #eee;
      font-size: 14px;
    }
  }
  .search {
    .form {
      height: 40px;
      input {
        flex: 1;
      }
    }
  }
}

.common {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .logName {
    display: flex;
    align-items: center;
    margin-right: 30px;
    img {
      width: 60px;
    }
  }
  .navbar__items {
    flex: 1;
    display: flex;
  }
  .search {
    height: 100%;
    padding: 10px;
    .form {
      border: 1px solid #aca6a6;
      position: relative;
      display: flex;
      align-items: center;
      input {
        border: 0;
        height: 100%;
        outline: none;
        padding: 0 10px;
        font-size: 14px;
      }
      button {
        outline: none;
        height: 100%;
        border: 0;
        width: 40px;
        border-left: 1px solid #aca6a6;
        font-size: 20px;
      }
    }
  }
}

.shaow {
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background-color: #5c5750;
}
</style>
