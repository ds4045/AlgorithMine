import { FC } from 'react';
import styles from './blog.module.css';
import { Select } from 'antd';
import { FormattedMessage } from 'react-intl';
type BlogNavigationProps = {};

const BlogNavigation: FC<BlogNavigationProps> = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
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
        { label: <FormattedMessage id="posts.popular" />, value: 'date_popular' },
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
        defaultValue={'all_posts'}
        style={{ width: 200 }}
        onChange={handleChange}
        options={items}
      />
    </div>
  );
};

export default BlogNavigation;
