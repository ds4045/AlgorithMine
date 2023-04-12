import { Rate } from 'antd';
import { FC } from 'react';
import styles from '../catalog.module.css';
import { FormattedMessage } from 'react-intl';
type DescriptionCardProps = {
  price: number;
  title: string;
  th: number | undefined;
};

const DescriptionCard: FC<DescriptionCardProps> = ({ price, title, th }) => {
  return (
    <ul className={styles.card_ul}>
      <li>
        <b>{title}</b>
      </li>
      <li>
        <FormattedMessage id="catalog.card.btn_from" /> {price}$
      </li>
      {th && <li>TH/s {th}</li>}
      <li>
        <Rate value={5} disabled />
      </li>
    </ul>
  );
};

export default DescriptionCard;
