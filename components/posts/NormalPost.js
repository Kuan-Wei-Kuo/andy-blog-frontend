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

const NormalPost = (props) => {
  const { title, content, categories, date } = props.source;
  return (
    <div className="post pt-4 pb-4 mb-4">
      <h1>
        {title}
      </h1>

      <div className="timeseries">
        <span>{moment(date).format(process.env.dateFormat.post)}</span>
      </div>
      <div className="categories">
        {renderCategories(categories)}
      </div>

      <ReactMarkdown
        source={content}
        renderers={{ code: CodeBlock }} 
      />
    </div>
  )
}

export default NormalPost;