module.exports = {
  env: {
    API_HOST: 'http://localhost:8080/andy.blog/public/api',
    header: {
      name: '安迪的部落格',
      navs: [{
        name: '首頁',
        href: '/'
      }, {
        name: '歸檔',
        href: '/archives'
      }, {
        name: '類別',
        href: '/categories'
      }]
    },
    previous: '上一頁',
    next: '下一頁'
  }
}