import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import styles from './header.module.css';
import { useAppSelector } from '../../redux/hooks';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

type BadgeWrapperProps = {
  darkThemes: boolean;
};

const BadgeWrapper: FC<BadgeWrapperProps> = ({ darkThemes }) => {
  const addedItems = useAppSelector((state) => state.cart.addedItems);
  const navigate = useNavigate();
  const totalUnits = useMemo(
    () => addedItems.reduce((acc, curr) => acc + curr.count, 0),
    [addedItems],
  );
  return (
    <Badge count={totalUnits} color="#F94F0C">
      <ShoppingCartOutlined
        onClick={() => navigate('/cart')}
        className={`${styles.cart} ${darkThemes ? styles.dark : styles.light}`}
      />
    </Badge>
  );
};

export default BadgeWrapper;
