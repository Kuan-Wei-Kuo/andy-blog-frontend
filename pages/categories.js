import React from 'react'
import axios from 'axios'

import { Container, Badge } from 'react-bootstrap'

import Layout from '../components/Layout'

class Categories extends React.Component {

    static async getInitialProps({asPath}) {
        const categories = await axios.get('http://localhost:8080/weblog/api/categories')
        .then(response => {
            let data = response.data;
            let categories = [];
            for(let i = 0 ; i < data.length ; i++) {
                categories.push(data[i].name)
            }
            return categories;
        });
        return { categories: categories, asPath: asPath }
    }

    generateChips = () => {
        let categories = this.props.categories;
        let chips = [];
        for(let i in categories) {
            chips.push(<Badge key={categories[i]} href={'/categories/' + categories[i]} className="mr-2" variant="dark">{categories[i]}</Badge>)
        }
        return chips;
    }


    render() {
        return(
            <Layout
                title="標籤 - 安迪的部落格" 
                description="標籤數量統計" 
                asPath={this.props.asPath}
            >
                <Container>
                    <div className="post-tags">{this.generateChips()}</div>
                </Container>
            </Layout>
        )
    }

}

export default Categories;