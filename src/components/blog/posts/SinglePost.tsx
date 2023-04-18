import { Button, Card } from 'antd';
import { FC } from 'react';
import styles from '../blog.module.css';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

type SinglePostProps = {
  id: string;
  title: string;
  image: string;
};

const SinglePost: FC<SinglePostProps> = ({ id, title, image }) => {
  const navigate = useNavigate();
  return (
    <Card
      className={styles.post}
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={image} className={styles.post_image} />}>
      <Card.Meta
        title={title}
        description={
          <Button type="link" className={styles.btn_read} onClick={() => navigate('/blog/' + id)}>
            <FormattedMessage id="posts.card_read" />
          </Button>
        }
      />
    </Card>
  );
};

export default SinglePost;
