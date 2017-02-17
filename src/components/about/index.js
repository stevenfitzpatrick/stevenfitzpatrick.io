import { h, Component } from 'preact';
import Picture from '../../assets/me.jpg';

export default class About extends Component {
  render() {
    return (
      <div>
        <h2>About Me</h2>
        <p>
          First of all, thanks for visiting my homepage ! I am a front-end developer currently based in Dublin, Ireland.

          My career has taken me through all different aspects of web development i.e. server side, client side, databases, web design, UI/UX etc.
        </p>

        <p>
          Having been through all that, I have quietely over the last few years picked a little niche for myself and tried to focus mainly on Front End Development (Which still keeps me on my toes every day reading tweets about another new framework etc.).
        </p>
      </div>
    );
  }
}
