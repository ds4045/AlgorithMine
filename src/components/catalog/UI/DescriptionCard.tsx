import { Rate } from 'antd';
import { FC, memo } from 'react';
import styles from '../catalog.module.css';
import { FormattedMessage } from 'react-intl';
type DescriptionCardProps = {
  price: number;
  title: string;
  hr: number | undefined;
  score: number;
};

const DescriptionCard: FC<DescriptionCardProps> = ({ price, title, hr, score }) => {
  return (
    <ul className={styles.card_ul}>
      <li>
        <b>{title}</b>
      </li>
      <li>
        <FormattedMessage id="catalog.card.btn_from" /> {price}₽
      </li>
      {hr && <li>{`${hr} ${hr > 1000 ? 'MH/s' : 'TH/s'}`}</li>}
      <li>
        <Rate value={score} disabled />
      </li>
    </ul>
  );
};

export default memo(DescriptionCard);
