/*global DISQUS */
import { h, Component } from 'preact';

let disqusAdded = false;
const DISQUS_CONFIG = ['shortname', 'identifier', 'title', 'url'];

function copyProps(context, props, prefix = '') {
  Object.keys(props).forEach(prop => {
    context[prefix + prop] = props[prop];
  });
}

class Disqus extends Component {
  addDisqusScript() {
    if (disqusAdded) {
      return;
    }

    const child = document.createElement('script');
    const [parent] = document.getElementsByTagName('head');
    child.async = true;
    child.type = 'text/javascript';
    child.src = `//${this.props.shortname}.disqus.com/embed.js`;
    parent.appendChild(child);
    disqusAdded = true;
  }

  loadDisqus() {
    const props = {};
    // Extract Disqus props that were supplied to this component
    DISQUS_CONFIG.forEach(prop => {
      if (this.props[prop]) {
        props[prop] = this.props[prop];
      }
    });

    if (!props.url || !props.url.length) {
      props.url = window.location.href;
    }

    if (typeof DISQUS !== 'undefined') {
      DISQUS.reset({
        reload: true,
        config() {
          copyProps(this.page, props);
        }
      });
    } else {
      copyProps(window, props, 'disqus_');
      this.addDisqusScript();
    }
  }

  componentDidMount() {
    this.loadDisqus();
  }

  render() {
    return (
      <section class="comments">
        <h4>Leave a Comment<span>.</span></h4>
        <div id="disqus_thread" />
      </section>
    );
  }
}

export default Disqus;
