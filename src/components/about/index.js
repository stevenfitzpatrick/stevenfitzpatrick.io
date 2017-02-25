import { h, Component } from 'preact';
import Picture from '../../assets/me2.jpg';
import style from './style';

export default class About extends Component {
  render() {
    return (
      <div>
        <h3>About Me</h3>
        <div class={style.about}>
          <img src={Picture} class={style.profile} />
          <p>
            Content Coming Soon… Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus voluptate quasi molestias doloremque deleniti ipsam et, amet, nulla tempore. Ipsum, mollitia sed id quidem doloribus dolore distinctio deleniti repudiandae unde!
          </p>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam eligendi neque aperiam ea temporibus nam aut soluta, quae ut nostrum odio ipsa reprehenderit provident, eum culpa rerum delectus quas facilis.
        </p>
      </div>
    );
  }
}
