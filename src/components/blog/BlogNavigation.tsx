import { Dispatch, FC, SetStateAction } from 'react';
import styles from './blog.module.css';
import { Select } from 'antd';
import { FormattedMessage } from 'react-intl';
import { SortedPostsType } from './posts/Posts';
type BlogNavigationProps = {
  setSortedPosts: Dispatch<SetStateAction<SortedPostsType>>;
  sortedPosts: SortedPostsType;
};

const BlogNavigation: FC<BlogNavigationProps> = ({ setSortedPosts, sortedPosts }) => {
  const handleChange = (value: string) => {
    setSortedPosts(value as SortedPostsType);
  };

  const items = [
    {
      label: <FormattedMessage id="posts.news" />,
      options: [
        { label: <FormattedMessage id="posts.date" />, value: 'date_news' },
        { label: <FormattedMessage id="posts.popular" />, value: 'popular_news' },
      ],
    },
    {
      label: <FormattedMessage id="posts.articles" />,
      options: [
        { label: <FormattedMessage id="posts.date" />, value: 'date_posts' },
        { label: <FormattedMessage id="posts.popular" />, value: 'popular_posts' },
      ],
    },
    {
      label: <FormattedMessage id="posts.all" />,
      value: 'all_posts',
    },
  ];
  return (
    <div className={styles.blog_nav}>
      <Select
        defaultValue={sortedPosts}
        style={{ width: 200 }}
        onChange={handleChange}
        options={items}
      />
    </div>
  );
};

export default BlogNavigation;
