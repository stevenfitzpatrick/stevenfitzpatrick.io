import { h, Component } from 'preact';

export default class Blog extends Component {
  render({title}) {
    return (
      <div className="hello">this is a blog entry for {title}</div>
    )
  }
}