import { h } from 'preact';

import ProfilePictureJpg from '../../assets/profile.jpg';
import ProfilePictureWebp from '../../assets/profile.webp';

function BlogMeta({ date }) {
  return (
    <div class="blog__meta">
      <figure>
        <picture>
          <source type="image/webp" srcset={ProfilePictureWebp} />
          <img src={ProfilePictureJpg} class="profile profile--small" alt="This is me !" />
        </picture>
      </figure>
      <div>
        <time>{date}</time>
        <address class="author">By: Steven Fitzpatrick</address>
      </div>
    </div>
  );
}

export default BlogMeta;
