const cacheableResponse = require('cacheable-response')
const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()

const ssrCache = cacheableResponse({
  ttl: 1000 * 60 * 60, // 1hour
  get: async ({ req, res, pagePath, queryParams }) => {
    const data = await app.render(req, res, pagePath, queryParams)

    // Add here custom logic for when you do not want to cache the page, for
    // example when the page returns a 404 status code:
    if (res.statusCode === 404) {
      res.end(data)
      return
    }

    return { data }
  },
  send: ({ data, res }) => res.send(data),
})

app.prepare().then(() => {
  const server = express()

  server.get('/', (req, res) => {
    const page = '/post.page';
    const params = {
      page: 1
    }
    app.render(req, res, page, { page: 1 });
  });
  server.get('/page/:page', (req, res) => {
    const page = '/post.page';
    const params = {
      page: req.params.page
    }
    if (params.page == 1)
      res.redirect('/')
    app.render(req, res, page, params);
  });

  server.get('/archives', (req, res) => {
    const page = '/archives.page';
    app.render(req, res, page, { page: 1 });
  });
  server.get('/archives/page/:page', (req, res) => {
    const page = '/archives.page';
    const params = {
      page: req.params.page
    }
    if (params.page == 1)
      res.redirect('/archives')
    app.render(req, res, page, params);
  });

  server.get('/categories', (req, res) => {
    const page = '/categories';
    app.render(req, res, page);
  });
  server.get('/categories/:category', (req, res) => {
    const page = '/categories.page';
    const params = {
      category: req.params.category,
      page: 1
    }
    app.render(req, res, page, params);
  });
  server.get('/categories/:category/page/:page', (req, res) => {
    const page = '/categories.page';
    const params = {
      category: req.params.category,
      page: req.params.page
    }
    if (params.page == 1)
      res.redirect(`/categories/${params.category}`)
    app.render(req, res, page, params);
  });

  server.get('/:year/:month/:day/:slug', (req, res) => {
    const page = '/post';
    const params = {
      year: req.params.year,
      month: req.params.month,
      day: req.params.day,
      slug: req.params.slug
    }
    app.render(req, res, page, params);
  });

  server.get('*', (req, res) => handle(req, res))

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
