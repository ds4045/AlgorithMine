import { Card } from 'antd';
import React, { FC } from 'react';

const { Meta } = Card;
type PopularSingleProps = {
  title: string;
  image: string;
};
const PopularSingle: FC<PopularSingleProps> = ({ title, image }) => {
  return (
    <Card
      hoverable
      style={{ width: 240, margin: 20 }}
      cover={<img alt="" src={image} height={200} />}>
      <Meta title={title} />
    </Card>
  );
};

export default PopularSingle;
