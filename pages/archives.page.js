import React from 'react'
import Router from 'next/router'
import axios from 'axios'
import moment from 'moment'

import { Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

import Layout from '../components/Layout';

const defaultSize = 20;

export default class ArchivesPage extends React.Component {

  static async getInitialProps({ res, query, asPath }) {
    const page = query.page
    const source = await axios.get(`${process.env.API_HOST}/posts?page=${page - 1}&size=${defaultSize}`)
      .then(response => {
        return response.data
      });
    return { source: source, asPath: asPath }
  }

  getArchiveItems() {
    const posts = this.props.source.content
    let dictionary = {}
    let archiveItems = []
    for(const post of posts) {
      const year = moment(post.createTime).format('YYYY')
      const href = moment(post.createTime).format('/YYYY/MM/DD/') + post.slug
      if (!dictionary[year])
        dictionary[year] = []
      dictionary[year].push(
        <li key={`archive-${year}-${post.id}`} className="archive-list-item mb-2">
          <span className="mr-2">{moment(post.createTime).format('YYYY-MM-DD')}</span>
          <a href={href}>{post.title}</a>
        </li>
      )
    }
    const archiveKeys = Object.keys(dictionary).sort(
      function (a, b) {
        return b - a
      }
    );
    for (const archiveKey of archiveKeys) {
      archiveItems.push(
        <div className="archive" key={`archive -${archiveKey}`}>
          <div className="archive-title">{archiveKey}</div>
          <ol>{dictionary[archiveKey]}</ol>
        </div>
      )
    }
    return archiveItems;
  }

  onPageChange = (page) => {
    let nextPage = page.selected + 1
    if (nextPage == 1)
      Router.push('/archive')
    else
      Router.push(`/archive/page/${nextPage}`)
  }

  render() {
    const { page, total } = this.props.source;
    return (
      <Layout
        title="歸檔 - 安迪的部落格"
        description="依據年份區分的文章列表"
        asPath={this.props.asPath}
      >
        <Container>
          <div>
            {this.getArchiveItems()}
          </div>
          <div className="text-center">
            <ReactPaginate
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
              previousLabel={process.env.previous}
              nextLabel={process.env.next}
              breakLabel={'...'}
              initialPage={page}
              disableInitialCallback={true}
              pageCount={total}
              onPageChange={this.onPageChange}
            ></ReactPaginate>
          </div>
        </Container>
      </Layout>
    )
  }

}