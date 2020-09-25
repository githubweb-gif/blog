import request from '../untils/request'

// 热门文章
export function getHot() {
  return request({
    url: '/hot',
    method: 'get'
  })
}
// 获取全部文章
export function getAll() {
  return request({
    url: '/allArticle',
    method: 'get'
  })
}

// 搜索文章// 获取分页文章
export function searchArticle(data) {
  return request({
    url: '/article',
    method: 'get',
    params: data
  })
}

// id查询wenzhang
// 同时返回上下篇
export function getArticle(id) {
  return request({
    url: `/article/${id}`,
    method: 'get'
  })
}

// 阅读数+1
export function addViews(id) {
  return request({
    url: `/views/${id}`,
    method: 'put'
  })
}

// 获取所有分类标签
export function getALLSort() {
  return request({
    url: '/sort',
    method: 'get'
  })
}

// 获取分类文章
export function getSortArticle(data) {
  return request({
    url: `/sort/${data.id}`,
    method: 'get',
    params: data.page
  })
}

// 网站数据统计Statistics
export function getStatistics() {
  return request({
    url: '/Statistics',
    method: 'get'
  })
}

// 修改网站数据统计
export function putStatistics() {
  return request({
    url: '/Statistics',
    method: 'put'
  })
}

// 获取网站信息
export function getsetting() {
  return request({
    url: '/setting',
    method: 'get'
  })
}
