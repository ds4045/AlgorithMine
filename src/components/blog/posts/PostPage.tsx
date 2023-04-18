import { Button, Divider } from 'antd';
import { FC } from 'react';
import styles from '../blog.module.css';
import { CalendarOutlined, EyeOutlined, LikeOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import Empty from 'antd/lib/empty';

type PostPageProps = {};

const PostPage: FC<PostPageProps> = () => {
  const allPosts = useAppSelector((state) => state.posts.posts);
  const params = useParams();
  const navigate = useNavigate();

  const post = allPosts.find((post) => post.id === params.id);
  return post ? (
    <div className={styles.post_page_wrapper}>
      <Button type="ghost" className={styles.post_page_btn_back} onClick={() => navigate(-1)}>
        <FormattedMessage id="auth.btn_back" />
      </Button>
      <Divider plain>{post.title}</Divider>
      <img className={styles.post_page_img} src={post.image} alt="" />
      <p className={styles.post_text}>{post.text}</p>
      <Divider />
      <div className={styles.post_icons}>
        <span className={styles.icon_wrapper}>
          <EyeOutlined />
          <em>{post.viewing}</em>
        </span>
        <span className={styles.icon_wrapper}>
          <LikeOutlined />
          <em>{post.like}</em>
        </span>
        <span className={styles.icon_wrapper}>
          <CalendarOutlined />
          <em>{post.date}</em>
        </span>
      </div>
    </div>
  ) : (
    <Empty />
  );
};

export default PostPage;
