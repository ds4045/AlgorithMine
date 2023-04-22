import { FC, ReactNode } from 'react';
import styles from '../personal_cabinet.module.css';
import { UserFirestoreDB } from '../../../types/types';
import { Avatar, Button, Divider, List, Popover } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useAppSelector } from '../../../redux/hooks';
import { sortByDate } from '../../../helpers/sortByDate';
type OrdersProps = {
  me: UserFirestoreDB | null;
};
type DataType = {
  key: React.Key;
  orderNumber: number;
  date: string;
  totalPrice: number;
  product: ReactNode;
  count: number;
};

const Orders: FC<OrdersProps> = ({ me }) => {
  const items = useAppSelector((state) => state.items.items);

  let data: DataType[] = [];
  if (me)
    data = me.orders.map((el, ind) => ({
      key: ind,
      orderNumber: el.orderNumber,
      date: el.date,
      totalPrice: el.totalPrice,
      count: el.orderedItems.reduce((acc, curr) => acc + curr.count, 0),
      product: (
        <Popover
          content={
            <List
              className={styles.popover}
              itemLayout="horizontal"
              dataSource={el.orderedItems}
              renderItem={(item) => (
                <List.Item className={styles.popover_orders}>
                  <List.Item.Meta
                    avatar={<Avatar src={items.find((el) => el.id === item.itemId)?.images[0]} />}
                    title={items.find((el) => el.id === item.itemId)?.title}
                    description={
                      <span>
                        {item.count} <FormattedMessage id="cart.units" />
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          }
          trigger="hover">
          <Button type="link">
            <FormattedMessage id="pk.orders.product" />
          </Button>
        </Popover>
      ),
    }));
  const columns: ColumnsType<DataType> = [
    {
      title: <FormattedMessage id="pk.orders.product" />,
      dataIndex: 'product',
    },
    {
      title: <FormattedMessage id="pk.orders.units" />,
      dataIndex: 'count',
    },
    {
      title: <FormattedMessage id="pk.orders.amount" />,
      dataIndex: 'totalPrice',
      sorter: {
        compare: (a, b) => a.totalPrice - b.totalPrice,
      },
    },
    {
      title: <FormattedMessage id="pk.orders.data" />,
      dataIndex: 'date',
      sorter: {
        compare: sortByDate,
      },
    },
    {
      title: <FormattedMessage id="pk.orders.order_num" />,
      dataIndex: 'orderNumber',
      width: 150,
    },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.personal_data}>
        <Divider plain>
          <FormattedMessage id="pc.btn_orders" />
        </Divider>
        <Table columns={columns} dataSource={data} scroll={{ y: 400 }} pagination={false} />
      </div>
    </div>
  );
};

export default Orders;
