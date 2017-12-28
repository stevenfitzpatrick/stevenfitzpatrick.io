import { h, Component } from 'preact';

class IntersectObserver extends Component {
  state = {
    inView: false
  };

  onEntry = (entry, observe) => {
    entry.forEach(({ isIntersecting, target }, item) => {
      if (isIntersecting) {
        target.classList.add('item--viewed');
        this.props.onInView();
        this.observer.unobserve(target);
      }
    });
  };

  componentDidMount() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(this.onEntry, {
        threshold: 0.9
      });

      this.observer.observe(this.base);
    } else {
      this.props.onInView();
    }
  }

  componentWillUnmount = () => {
    this.observer.disconnect();
  };

  render({ children }) {
    return this.props.render();
  }
}

export default IntersectObserver;
