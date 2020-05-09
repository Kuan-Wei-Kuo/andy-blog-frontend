import moment from 'moment';

import { Badge } from 'react-bootstrap';

import ReactMarkdown from 'react-markdown';
import CodeBlock from '../CodeBlock';

const NormalPost = (props) => {
  let categories = props.source.categories;
  let chips = [];
  for (let i in categories) {
    chips.push(<Badge key={`category-${i}`} className="mr-2" variant="dark">{categories[i]}</Badge>)
  }
  return (
    <div className="post pt-5 pb-5  ">
      <div className="post-title mb-2">{props.source.title}</div>
      <div className="post-subtitle mb-2">
        <span>{moment(props.source.date).format('MMM D, YYYY')}</span>
      </div>
      <div className="post-categories mb-2">
        {chips}
      </div>
      <ReactMarkdown source={props.source.content} renderers={{ code: CodeBlock }} />
    </div>
  )
}

export default NormalPost;