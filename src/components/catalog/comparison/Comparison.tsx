import { Button, Card, Descriptions, Divider, Empty, Space } from 'antd';
import { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { Item } from '../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { removeItemFromComparison } from '../../../redux/comparisonSlice';
import { addItem } from '../../../redux/cartSlice';
import styles from '../catalog.module.css';

type ComparisonProps = {};

const Comparison: FC<ComparisonProps> = () => {
  const items = useAppSelector((state) => state.comparison.addedItems);
  const dispatch = useAppDispatch();
  const remove = (id: string) => {
    dispatch(removeItemFromComparison(id));
  };
  const addToCart = (item: Item) => {
    dispatch(addItem(item));
  };
  return (
    <div className={styles.comparison_wrapper}>
      {items.length ? (
        items.map((item) => (
          <>
            <Divider plain key={item.id}>
              <b>{item.title}</b>
            </Divider>
            <Card>
              <Space>
                <Descriptions>
                  <Descriptions.Item label={<FormattedMessage id="catalog.card.modal_maker" />}>
                    {item.maker}
                  </Descriptions.Item>
                  <Descriptions.Item label={<FormattedMessage id="catalog.card.modal_payback" />}>
                    {item.optional.payback}
                  </Descriptions.Item>
                  <Descriptions.Item label={<FormattedMessage id="catalog.card.modal_hashrate" />}>
                    {item.optional.hashrate}
                  </Descriptions.Item>
                  <Descriptions.Item label={<FormattedMessage id="catalog.card.modal_profit" />}>
                    {item.optional.profit}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={<FormattedMessage id="catalog.card.modal_expenditure" />}>
                    {item.optional.expenditure}
                  </Descriptions.Item>
                  <Descriptions.Item label={<FormattedMessage id="catalog.card.modal_price" />}>
                    {item.price}
                  </Descriptions.Item>
                </Descriptions>
              </Space>
              <Space direction="horizontal" size="middle">
                <Button type="primary" onClick={() => addToCart(item)}>
                  {<FormattedMessage id="catalog.card.modal_add_to_cart" />}
                </Button>
                <Button onClick={() => remove(item.id)}>
                  {<FormattedMessage id="catalog.card.modal_remove_to_сomparison" />}
                </Button>
              </Space>
            </Card>
          </>
        ))
      ) : (
        <Empty className={styles.comparison_empty} />
      )}
    </div>
  );
};

export default Comparison;
