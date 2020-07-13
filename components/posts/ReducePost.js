import moment from 'moment';
import ReactMarkdown from 'react-markdown';

import CodeBlock from '../CodeBlock';

function renderCategories(categories) {
  let badges = [];
  for (let i in categories) {
    badges.push(
      <a
        key={`category-${i}`} 
        className="badge badge-primary mr-2"
        href={`/categories/${categories[i]}`}
        variant="primary"
      >
        {categories[i]}
      </a>
    );
  }
  return badges;
}

const ReducePost = (props) => {
  const { title, content, categories, slug, date } = props.source;
  const href = `/${moment(date).format(process.env.dateFormat.slash)}/${slug}`;
  const limitContent = `${content.substring(0, content.length / 3)}...`;
  return (
    <div className="post pb-4 mb-4">
      <h2>
        <a
          className="blog-link"
          href={href}
        >
          {title}
        </a>
      </h2>

      <div className="timeseries">
        {moment(date).format(process.env.dateFormat.post)}
      </div>
      <div className="categories">
        {renderCategories(categories)}
      </div>
      
      <ReactMarkdown
        source={limitContent}
        renderers={{ code: CodeBlock }}
      />

      <div className="text-center">
        <a
          className="blog-link"
          href={href}
        >
          看更多
        </a>
      </div>
    </div>
  )
}

export default ReducePost;