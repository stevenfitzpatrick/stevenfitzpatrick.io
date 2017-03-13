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
  constructor() {
    super();
  }

  addDisqusScript() {
    if (disqusAdded) {
      return;
    }

    const child = (this.disqus = document.createElement('script'));
    const parent = document.getElementsByTagName('head')[0] ||
      document.getElementsByTagName('body')[0];

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

    this.props.url = window.location.href;
    if (typeof DISQUS !== 'undefined') {
      DISQUS.reset({
        reload: true,
        config: function config() {
          copyProps(this.page, props);
          // Disqus needs hashbang URL, see https://help.disqus.com/customer/portal/articles/472107
          //this.page.url = this.page.url.replace(/#/, '') + '#!newthread';
        }
      });
    } else {
      this.addDisqusScript();
    }
  }

  // componentDidUpdate() {
  //   debugger;
  //   this.loadDisqus();
  // }

  componentDidMount() {
    this.loadDisqus();
  }

  render() {
    return <div id="disqus_thread" />;
  }
}

export default Disqus;
