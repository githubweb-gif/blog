<template>
  <div id="layout" ref="layout">
    <header>
      <header-vue />
    </header>
    <main
      ref="main"
      v-loading.fullscreen.lock="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 1)"
    >
      <div class="mainBody">
        <div ref="list" class="list">
          <keep-alive>
            <router-view v-if="$route.meta.KeepAlive" />
          </keep-alive>
          <router-view v-if="!$route.meta.KeepAlive" @loading="loadMethod" />
        </div>
        <div class="sideBar">
          <side-vue />
        </div>
      </div>
    </main>
    <footer>
      <footer-vue />
    </footer>
  </div>
</template>

<script>
import HeaderVue from './components/header.vue'
import FooterVue from './components/footer.vue'
import SideVue from './components/sideBar.vue'
export default {
  components: {
    HeaderVue,
    FooterVue,
    SideVue
  },
  data() {
    return {
      loading: false
    }
  },
  watch: {
    $route(to) {
      const height = this.$refs.list.offsetHeight
      if (to.path.split('/')[1] === 'article' && to.hash === '') {
        this.$refs.list.style['min-height'] = height + 'px'
        this.loading = true
      }
    }
  },
  methods: {
    loadMethod(value) {
      this.loading = value
      this.$refs.list.style['min-height'] = 'auto'
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1200px) {
  .list {
    padding: 0 20px;
  }
}
@media screen and (max-width: 920px) {
  .mainBody {
    flex-direction: column;
  }
  .sideBar {
    margin: 20px 0 0 0 !important;
  }
}
#layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
header {
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid #ecebf0;
  background-color: #ffffff;
  z-index: 3000;
}
main {
  flex: 1;
  width: 100%;
  margin-top: 4rem;
  .mainBody {
    max-width: 1140px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .list {
      flex: 5;
      overflow: hidden;
    }
    .sideBar {
      flex: 2;
      margin-left: 50px;
      overflow: hidden;
    }
  }
}
</style>
