import moment from 'moment';

import { Badge } from 'react-bootstrap';

import ReactMarkdown from 'react-markdown';
import CodeBlock from '../CodeBlock';

const ReducePost = (props) => {
  let href = moment(props.source.createTime).format('/YYYY/MM/DD/') + props.source.slug;
  let limitContent = props.source.content.substring(0, props.source.content.length / 3) + '...';
  let categories = props.source.categories;
  let chips = [];
  for (let i in categories) {
    chips.push(<Badge key={`category-${i}`} className="mr-2" variant="dark">{categories[i]}</Badge>)
  }
  return (
    <div className="post pt-5 pb-5  ">
      <div className="post-title mb-2"><a href={href}>{props.source.title}</a></div>
      <div className="post-subtitle mb-2">
        <span>{moment(props.source.date).format('MMM D, YYYY')}</span>
      </div>
      <div className="post-categories mb-2">
        {chips}
      </div>
      <ReactMarkdown source={limitContent} renderers={{ code: CodeBlock }} />
      <div className="text-center"><a href={href}>Read More</a></div>
    </div>
  )
}

export default ReducePost;