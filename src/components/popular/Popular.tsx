import React, { FC, useCallback } from 'react';
import styles from './popular.module.css';
import { FormattedMessage } from 'react-intl';
import PopularSingle from './PopularSingle';
import { Button } from 'antd';
import { CategoryType } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { setCurrentCategory } from '../../redux/currentCategorySlice';
import { useAppDispatch } from '../../redux/hooks';
const popularItems = [
  {
    id: 1,
    image: 'https://mrjeep.ru/upload/iblock/ebd/ebd74a789366df6102971be37496c2a1.jpg',
    title: 'WhatsMiner',
  },
  {
    id: 2,
    image: 'https://en.cryptonomist.ch/wp-content/uploads/2018/11/Bitmain-1.jpg',
    title: 'Antminer',
  },
  {
    id: 3,
    image:
      'https://cdn.shopify.com/s/files/1/0012/1366/1307/collections/innosilicon_logo.png?v=1590144894',
    title: 'Innosilicon',
  },
  {
    id: 4,
    image: 'https://www.goldshell.com/wp-content/uploads/2020/08/logo1-e1598946023334-1200x675.png',
    title: 'Gold Shell',
  },
];
const Popular: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const buttonHandler = useCallback(() => {
    dispatch(setCurrentCategory('Asic'));
    navigate('/catalog');
  }, [dispatch, navigate]);
  return (
    <>
      <h2 className={styles.title}>
        <FormattedMessage id="popular.title" />
        <Button type="link" size="large" onClick={buttonHandler}>
          <FormattedMessage id="popular.all_btn" />
        </Button>
      </h2>
      <div className={styles.wrapper}>
        {popularItems.map((el) => (
          <PopularSingle key={el.id} title={el.title as CategoryType} image={el.image} />
        ))}
      </div>
    </>
  );
};

export default Popular;
