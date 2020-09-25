import Vue from 'vue'

Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '')
  const d = (dt.getDate() + '')

  return `${y}-${m}-${d}`
})

Vue.filter('URL', function(value) {
  const url = 'http://106.53.102.65:3000'
  if (value === '') {
    return ''
  }
  return url + value
})
