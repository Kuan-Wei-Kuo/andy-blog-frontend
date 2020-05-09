
import React from 'react'
import axios from 'axios'

import { Container } from 'react-bootstrap'

import Layout from '../components/Layout'
import NormalPost from '../components/posts/NormalPost'

export default class SlugPost extends React.Component {

  static async getInitialProps({query, asPath}) {
    const source = await axios.get(`http://localhost:8080/weblog/api/posts/${query.slug}`)
    .then(response => {
        return response.data;
    });
    return {
        source: source,
        asPath: asPath
    }; 
  }

  render() {
    const { source } = this.props
    return (
      <Layout>
        <Container>
          <NormalPost source={source} />
          <div className="post-paginate pt-4 pb-4">
            <a href="#">Previous</a>
            <a href="#">Next</a>
          </div>
        </Container>
      </Layout>
    )
  }

}