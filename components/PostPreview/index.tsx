import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { Post } from '../../lib/mongodb';

interface Props {
  post: Post;
};

export const PostPreview = ({ post }: Props): JSX.Element => {
  const { slug, title, time, image, lead } = post;
  return (
    <div className={styles.postPreview}>
      <div className={styles.postPreviewHead}>
        <img 
          className={styles.postPreviewImage}
          src={image}
        />
        <div className={styles.postPreviewInfo}>
          <h2 className={styles.postPreviewTitle}>
            <Link href={`posts/${slug}`}>
              {title}
            </Link>
          </h2>
          <p className={styles.postPreviewTime}>{time}</p>
        </div>
      </div>
      <p>{lead}</p>
    </div>
  );
};

export default PostPreview;