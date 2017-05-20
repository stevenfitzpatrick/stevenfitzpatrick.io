import { h, Component } from 'preact';
import Loading from '../loading';
const LoadingHOC = WrappedComponent => {
  return class LoadingHOC extends Component {
    render(props) {
      return props.bookmarks.length === 0
        ? <Loading />
        : <WrappedComponent {...props} />;
    }
  };
};

export default LoadingHOC;
