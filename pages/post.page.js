import React from 'react'
import Router from 'next/router'
import axios from 'axios'

import { Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

import Layout from '../components/Layout'
import ReducePost from '../components/posts/ReducePost';

const defaultSize = 5;

export default class PostPage extends React.Component {

  static async getInitialProps({ query, asPath }) {
    const page = query.page
    const source = await axios.get(`http://localhost:8080/weblog/api/posts?page=${page - 1}&size=${defaultSize}`)
      .then(response => {
        return response.data;
      })
    return { source: source, asPath: asPath };
  }

  generatePosts = () => {
    let posts = [];
    let data = this.props.source.content;
    for(let i in data) {
      posts.push(<ReducePost key={data[i].slug} source={data[i]}></ReducePost>);
    }
    return posts;
  }

  onPageChange = (page) => {
    let nextPage = page.selected + 1
    if(nextPage == 1)
      Router.push('/')
    else
      Router.push(`/page/${nextPage}`)
  }

  render() {
    const { page, total } = this.props.source;
    return (
      <Layout
        asPath={this.props.asPath}
      >
        <Container>
          <div className="posts">
            {this.generatePosts()}
          </div>
          <div className="text-center">
            <ReactPaginate
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
              previousLabel={'Previous'}
              nextLabel={'Next'}
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