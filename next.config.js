module.exports = {
  env: {
    API_HOST: 'http://localhost:8080/andy.blog/public/api',
    dateFormat: {
      dash: 'YYYY-MM-DD',
      slash: 'YYYY/MM/DD',
      post: 'MMM D, YYYY'
    },
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
    archives: {
      title: '歸檔 - 安迪的部落格',
      description: '依據年份區分的文章列表'
    },
    categories: {
      title: '標籤 - 安迪的部落格',
      description: '標籤數量統計'
    },
    previous: '上一頁',
    next: '下一頁'
  }
}