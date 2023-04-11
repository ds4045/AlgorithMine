import { Rate } from 'antd';
import React, { FC } from 'react';
import styles from '../catalog.module.css';
type DescriptionCardProps = {};

const DescriptionCard: FC<DescriptionCardProps> = () => {
  return (
    <ul className={styles.card_ul}>
      <li>
        <b>Bitmain Antminer E9</b>
      </li>
      <li>от 4560$</li>
      <li>TH/s 120</li>
      <li>
        <Rate value={5} />
      </li>
    </ul>
  );
};

export default DescriptionCard;
