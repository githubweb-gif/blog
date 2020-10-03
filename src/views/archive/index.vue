<template>
  <div>
    <table cellspacing="20">
      <tr v-for="(item,index) in dataList" :key="index">
        <td>{{ item.createAt | dateFormat }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.meta.views }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { getAll } from '@/api/article'
export default {
  data() {
    return {
      dataList: []
    }
  },
  created() {
    window.scroll(0, 0)
    this.initData()
  },
  methods: {
    initData() {
      getAll().then((res) => {
        this.dataList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
td {
  font-size: 14px;
}
</style>
