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
    const posts = this.props.source.content;
    let dictionary = {};
    let archiveItems = [];
    for(const post of posts) {
      let { id, title, date, slug } = post
      const year = new Date(date).getFullYear();
      const href = `/${moment(date).format(process.env.dateFormat.slash)}/${slug}`;

      if (!dictionary[year])
        dictionary[year] = [];

      dictionary[year].push(
        <li
          key={`archive-${year}-${id}`}
          className="archive-list-item mb-1"
        >
          <span className="mr-2">
            {moment(date).format(process.env.dateFormat.dash)}
          </span>
          <a className="blog-link" href={href}>{title}</a>
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
        <div className="archive" key={`archive-${archiveKey}`}>
          <h2>{archiveKey}</h2>
          <ol>{dictionary[archiveKey]}</ol>
        </div>
      )
    }
    return archiveItems;
  }

  onPageChange = (page) => {
    let nextPage = page.selected + 1;
    if (nextPage == 1)
      Router.push('/archive');
    else
      Router.push(`/archive/page/${nextPage}`);
  }

  render() {
    const { asPath } = this.props;
    const { page, total } = this.props.source;
    return (
      <Layout
        title={process.env.archives.title}
        description={process.env.archives.description}
        asPath={asPath}
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