const prodplugins = []
if (process.env.NODE_ENV === 'production') {
  prodplugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    // 发布时的插件数组
    ...prodplugins,
    ['prismjs', {
      languages: ['javascript', 'css', 'html'],
      plugins: ['line-numbers'], // 使用了行号还可以添加其他插件，具体去官网看看吧
      theme: 'okaidia',
      css: true
    }]
  ]
}
