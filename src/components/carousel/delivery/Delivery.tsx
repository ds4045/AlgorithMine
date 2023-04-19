import { FormattedMessage } from 'react-intl';
import styles from './delivery.module.css';

const Delivery = () => {
  return (
    <>
      <div className={styles.delivery_wrapper}>
        <div className={styles.delivery_img}>
          <FormattedMessage id="delivery.fast" />
        </div>
        <div className={styles.delivery_img_ship}>
          <FormattedMessage id="delivery.ship" />
        </div>
      </div>
      <div className={styles.description}>
        <h3>
          <FormattedMessage id="delivery.payment" />
        </h3>
        <p>
          <FormattedMessage id="delivery.payment.description" />
        </p>
        <h3>
          <FormattedMessage id="delivery.delivery.variants" />
        </h3>
        <p>
          <b>
            <FormattedMessage id="delivery.delivery.variants_self" />
          </b>
          <br />
          <FormattedMessage id="delivery.delivery.variants_self_description" />
        </p>
        <p>
          <b>
            <FormattedMessage id="delivery.delivery.variants_sdek" />
          </b>
          <br />
          <FormattedMessage id="delivery.delivery.variants_sdek_description" />
        </p>
        <p>
          <b>
            <FormattedMessage id="delivery.delivery.variants_line" />
          </b>
          <br />
          <FormattedMessage id="delivery.delivery.variants_line_description" />
        </p>
        <h3>
          <FormattedMessage id="delivery.pay" />
        </h3>
        <p>
          <b>
            <FormattedMessage id="delivery.variants" />
          </b>
          <br />
          <FormattedMessage id="delivery.variants_description" />
        </p>
      </div>
    </>
  );
};

export default Delivery;
