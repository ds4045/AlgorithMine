import { Button, Card } from 'antd';
import { FC } from 'react';
import styles from '../blog.module.css';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { incrementViewPost } from '../../../firbase/incrementViewPost';
import { PostType } from '../../../types/types';

type SinglePostProps = {
  post: PostType;
};

const SinglePost: FC<SinglePostProps> = ({ post }) => {
  const navigate = useNavigate();
  const openPostHandler = () => {
    navigate('/blog/' + post.id);
    incrementViewPost(post);
  };
  return (
    <Card
      className={styles.post}
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={post.image} className={styles.post_image} />}>
      <Card.Meta
        title={post.title}
        description={
          <Button type="link" className={styles.btn_read} onClick={openPostHandler}>
            <FormattedMessage id="posts.card_read" />
          </Button>
        }
      />
    </Card>
  );
};

export default SinglePost;
