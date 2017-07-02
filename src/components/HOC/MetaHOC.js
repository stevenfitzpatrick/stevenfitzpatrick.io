import { h, Component } from 'preact';
import config from '../../config';

const MetaHOC = WrappedComponent =>
  class MetaHOC extends Component {
    componentWillMount() {
      const { title = '', description = '' } = this.props;
      document.title = title ? `${title} | ${config.title}` : config.title;
      document.querySelector('meta[name=description]').content = description
        ? `${config.description} ${description}`
        : config.description;
    }

    render(props, { shouldRender }) {
      return <WrappedComponent {...props} />;
    }
  };

export default MetaHOC;
