import React from 'react';
import styles from './popular.module.css';
import { FormattedMessage } from 'react-intl';
import PopularSingle from './PopularSingle';
import { Button } from 'antd';
const popularItems = [
  {
    id: 1,
    image: 'https://mrjeep.ru/upload/iblock/ebd/ebd74a789366df6102971be37496c2a1.jpg',
    title: 'Whatsminer',
  },
  {
    id: 2,
    image: 'https://en.cryptonomist.ch/wp-content/uploads/2018/11/Bitmain-1.jpg',
    title: 'Bitmain',
  },
  {
    id: 3,
    image: 'https://asicfox.ua/wp-content/uploads/2022/10/innosilicon.png',
    title: 'Innosilicon',
  },
  {
    id: 4,
    image: 'https://www.goldshell.com/wp-content/uploads/2020/08/logo1-e1598946023334-1200x675.png',
    title: 'Gold Shell',
  },
];
const Popular = () => {
  return (
    <>
      <h2 className={styles.title}>
        <FormattedMessage id="popular.title" />
        <Button type="link" size="large">
          <FormattedMessage id="popular.all_btn" />
        </Button>
      </h2>
      <div className={styles.wrapper}>
        {popularItems.map((el) => (
          <PopularSingle key={el.id} title={el.title} image={el.image} />
        ))}
      </div>
    </>
  );
};

export default Popular;
