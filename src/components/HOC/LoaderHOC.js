import { h, Component } from 'preact';
import Loading from '../loading';
const LoadingHOC = WrappedComponent =>
  class LoadingHOC extends Component {
    state = {
      shouldRender: false
    };

    componentDidMount() {
      window.requestAnimationFrame(_ => {
        window.requestAnimationFrame(_ => {
          this.setState({ shouldRender: true });
        });
      });
    }

    render(props, { shouldRender }) {
      return props.bookmarks.length === 0
        ? shouldRender && <Loading />
        : shouldRender && <WrappedComponent {...props} />;
    }
  };

export default LoadingHOC;
