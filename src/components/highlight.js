import { h, Component } from 'preact';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/Ocean.css';
import '../styles/highlight';
import cx from 'classnames';

const LANGUAGES = { javascript };
Object.keys(LANGUAGES).forEach(key =>
  hljs.registerLanguage(key, LANGUAGES[key]));

class Highlight extends Component {
  render({ code, type }, state) {
    let text = code.replace(/''/g, '"');
    let highlighted = hljs.highlightAuto(text, [type]);
    let hLang = highlighted.language;

    return (
      <pre class={cx('highlight', `highlight-${hLang}`)}>
        <code
          class={`hljs lang-${hLang}`}
          dangerouslySetInnerHTML={{
            __html: hljs.fixMarkup(highlighted.value)
          }}
        />
      </pre>
    );
  }
}

export default Highlight;
