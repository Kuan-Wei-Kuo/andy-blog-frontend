import React from 'react'
import axios from 'axios'

import { Container, Badge } from 'react-bootstrap'

import Layout from '../components/Layout'

class Categories extends React.Component {

  static async getInitialProps({ asPath }) {
    const categories = await axios.get('http://localhost:8080/andy.blog/public/api/categories')
      .then(response => {
        let data = response.data;
        let categories = [];
        for (let i = 0; i < data.length; i++) {
          categories.push(data[i].name)
        }
        return categories;
      });
    return { categories: categories, asPath: asPath }
  }

  generateChips = () => {
    let categories = this.props.categories;
    let chips = [];
    for (let i in categories) {
      chips.push(<a href={`/categories/${categories[i]}`} key={`category-${i}`} className="badge badge-primary mr-2" variant="primary">{categories[i]}</a>)
    }
    return chips;
  }


  render() {
    return (
      <Layout
        title={process.env.archives.title}
        description={process.env.archives.description}
        asPath={this.props.asPath}
      >
        <Container>
          {this.generateChips()}
        </Container>
      </Layout>
    )
  }

}

export default Categories;