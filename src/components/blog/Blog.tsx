import Posts from './posts/Posts';
import styles from './blog.module.css';
import { FC } from 'react';
import { Card } from 'antd';
type BlogProps = {
  loading: boolean;
};
const Blog: FC<BlogProps> = ({ loading }) => {
  return (
    <div className={styles.blog_wrapper}>
      {loading ? (
        <div className={styles.skeleton_wrapper}>
          {new Array(4).fill(null).map((_, ind) => (
            <Card className={styles.skeleton} key={ind} loading={loading} />
          ))}
        </div>
      ) : (
        <Posts />
      )}
    </div>
  );
};

export default Blog;
