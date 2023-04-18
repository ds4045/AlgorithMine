import { FC } from 'react';
import SinglePost from './SinglePost';
import styles from '../blog.module.css';
import BlogNavigation from '../BlogNavigation';
import { useAppSelector } from '../../../redux/hooks';

type PostsProps = {};

const Posts: FC<PostsProps> = () => {
  const posts = useAppSelector((state) => state.posts.posts);
  return (
    <>
      <BlogNavigation />
      <div className={styles.posts_wrapper}>
        {posts.map((post) => (
          <SinglePost id={post.id} key={post.id} image={post.image} title={post.title} />
        ))}
      </div>
    </>
  );
};

export default Posts;
