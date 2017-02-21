import { h } from 'preact';
import styles from './style';

const SuccessMessage = ({ itemKey }) => {
  if (!itemKey) return;

  return (
    <div class={styles.success}>
      Favourite Item has been created : {itemKey}
    </div>
  );
};

export { SuccessMessage };
