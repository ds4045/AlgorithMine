import { Button, Divider, Spin } from 'antd';
import { FC, useState } from 'react';
import styles from '../blog.module.css';
import { CalendarOutlined, EyeOutlined, HeartFilled } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Empty from 'antd/lib/empty';
import useAlert from '../../../hooks/useAlert';
import { toggleLikeHandler } from '../../../firbase/toggleLikeHandler';
import { UserFirestoreDB } from '../../../types/types';

type PostPageProps = {};

const PostPage: FC<PostPageProps> = () => {
  const [, alertError, contextHolder] = useAlert();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.login);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const allPosts = useAppSelector((state) => state.posts.posts);
  const params = useParams();
  const post = allPosts.find((post) => post.id === params.id);
  const isFavorite = post?.like.some((el) => el === user?.id) ?? false;

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const likeHandler = () => {
    post &&
      toggleLikeHandler(
        isFavorite ? 'delete' : 'add',
        user as UserFirestoreDB,
        isAuth,
        post,
        dispatch,
        alertError,
        setIsLoading,
      );
  };
  return post ? (
    <div className={styles.post_page_wrapper}>
      {contextHolder}
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
        {isLoading ? (
          <Spin className={styles.spinner} />
        ) : (
          <span className={styles.icon_wrapper} onClick={likeHandler}>
            <HeartFilled className={isFavorite ? styles.like : styles.dislike} />
            <em>{post.like.length || 0}</em>
          </span>
        )}
        <span className={styles.icon_wrapper} onClick={() => {}}>
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
