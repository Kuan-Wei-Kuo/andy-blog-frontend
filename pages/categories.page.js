import React from 'react'
import axios from 'axios'
import moment from 'moment'

import ReactPaginate from 'react-paginate'
import { Container } from 'react-bootstrap'
import Layout from '../components/Layout'

const defaultSize = 20;

class CategoriesPage extends React.Component {

  static async getInitialProps({ query, asPath }) {
    const url = `${process.env.API_HOST}/posts?page=${query.page - 1}&size=${defaultSize}&category=${query.category}`;
    const source = await axios.get(url).then(response => {
      return response.data;
    });
    return {
      category: query.category,
      page: source.page,
      size: source.size,
      total: source.total,
      data: source.content,
      asPath: asPath
    };
  }

  generateArchive = () => {
    let category = this.props.category;
    let data = this.props.data;
    let listItems = [];
    for (let i in data) {
      let href = moment(data[i].createTime).format('/YYYY/MM/DD/') + data[i].slug;
      listItems.push(
        <li key={data[i].slug} className="archive-list-item">
          <span className="mr-2">{moment(data[i].createTime).format('YYYY-MM-DD')}</span>
          <a href={href}>{data[i].title}</a>
        </li>
      );
    }
    return (
      <div className="archive">
        <h2>{category}</h2>
        <ol>{listItems}</ol>
      </div>
    );
  }

  onPageChange = (page) => {
    let nextPage = page.selected + 1;
    if (nextPage == 1)
      window.location.href = '/categories/' + this.props.category;
    else
      window.location.href = '/categories/' + this.props.category + '/page/' + nextPage;
  }

  render() {
    const { page, total, category, asPath } = this.props;
    return (
      <Layout
        title={category + ' - 安迪的部落格'}
        description={process.env.archives.description}
        asPath={asPath}
      >
        <Container>
          <div>
            {this.generateArchive()}
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

export default CategoriesPage;