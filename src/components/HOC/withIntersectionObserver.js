import { h, Component } from 'preact';

class IntersectionObserverHOC extends Component {
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
        rootMargin: '0px',
        threshold: 0.8
      });

      this.observer.observe(this.base);
    }
  }

  render({ children }, { shouldRender }) {
    return this.props.render();
  }
}

export default IntersectionObserverHOC;
