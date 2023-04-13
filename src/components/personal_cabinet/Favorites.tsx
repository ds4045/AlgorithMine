import { FC } from 'react';
import styles from './personal_cabinet.module.css';
import { UserFirestoreDB } from '../../types/types';
import { Divider } from 'antd';

type FavoritesProps = {
  me: UserFirestoreDB | null;
};

const Favorites: FC<FavoritesProps> = ({ me }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.personal_data}>
        <Divider plain>Favorites</Divider>
      </div>
    </div>
  );
};

export default Favorites;
