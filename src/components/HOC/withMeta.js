import { h, Component } from 'preact';

import config from '../../config';

const withMeta = WrappedComponent =>
  class withMeta extends Component {
    static displayName = `withMeta(${WrappedComponent.displayName || WrappedComponent.name})`;

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

export default withMeta;
