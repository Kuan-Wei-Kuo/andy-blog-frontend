
import React from 'react'
import axios from 'axios'

import { Container } from 'react-bootstrap'

import Layout from '../components/Layout'
import NormalPost from '../components/posts/NormalPost'

export default class SlugPost extends React.Component {

  static async getInitialProps({query, asPath}) {
    const source = await axios.get(`${process.env.API_HOST}/posts/${query.slug}`)
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
        </Container>
      </Layout>
    )
  }

}