import { h, Component } from 'preact';

class BackToTop extends Component {
  handleScroll = e => {
    if (window.scrollY >= 500) {
      this.base.classList.add('button--display');
    } else {
      this.base.classList.remove('button--display');
    }
  };

  scrollTop = () => {
    if (document.body.scrollTop === 0) return;
    window.scrollBy(0, -100);
    requestAnimationFrame(this.scrollTop);
  };

  backToTopScroll = e => {
    e.preventDefault();
    requestAnimationFrame(this.scrollTop);
  };

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }
  render({ children }) {
    return (
      <button
        ref={el => (this.backToTopBtn = el)}
        class="button--fixed"
        onClick={this.backToTopScroll}
      >
        {children}
      </button>
    );
  }
}

export default BackToTop;
