import { FC, useEffect, useState } from 'react';
import SinglePost from './SinglePost';
import styles from '../blog.module.css';
import BlogNavigation from '../BlogNavigation';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { sortPost } from '../../../redux/postsSlice';
import { sortByDate } from '../../../helpers/sortByDate';
export type SortedPostsType =
  | 'all_posts'
  | 'date_news'
  | 'popular_news'
  | 'date_posts'
  | 'popular_posts';
type PostsProps = {};

const Posts: FC<PostsProps> = () => {
  const posts = useAppSelector((state) => state.posts.posts);
  const renderPosts = useAppSelector((state) => state.posts.searchedPosts);

  const dispatch = useAppDispatch();
  const [sortedPosts, setSortedPosts] = useState<SortedPostsType>('all_posts');
  useEffect(() => {
    switch (sortedPosts) {
      case 'date_news': {
        const sortedPosts = posts.filter((el) => el.section === 'news');
        dispatch(sortPost(sortedPosts.sort(sortByDate)));
        break;
      }
      case 'date_posts': {
        const sortedPosts = posts.filter((el) => el.section === 'post');
        dispatch(sortPost(sortedPosts.sort(sortByDate)));
        break;
      }
      case 'popular_news': {
        const sortedPosts = posts.filter((el) => el.section === 'news');
        dispatch(sortPost(sortedPosts.sort((a, b) => b.viewing - a.viewing)));
        break;
      }
      case 'popular_posts': {
        const sortedPosts = posts.filter((el) => el.section === 'post');
        dispatch(sortPost(sortedPosts.sort((a, b) => b.viewing - a.viewing)));
        break;
      }
      default: {
        dispatch(sortPost(posts));
        break;
      }
    }
  }, [sortedPosts, dispatch, posts]);
  return (
    <>
      <BlogNavigation setSortedPosts={setSortedPosts} sortedPosts={sortedPosts} />
      <div className={styles.posts_wrapper}>
        {renderPosts.map((post) => (
          <SinglePost key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default Posts;
