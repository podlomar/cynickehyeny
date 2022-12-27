import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { Post } from '../../lib/mongodb';
import Avatar from '../Avatar';

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
          <div className={styles.postPreviewTimeAuthor}>
            <div className={styles.postPreviewAuthor}>
              <Avatar imageUrl="https://www.newtontech.net/wp-content/uploads/2018/06/lenka-weingartova-ctverec.jpg" />
              <p>Hyena Lenka</p>
            </div>
            <p className={styles.postPreviewTime}>{time}</p>
          </div>
        </div>
      </div>
      <p className={styles.postPreviewLead}>{lead}</p>
      <div className={styles.postPreviewFoot}>
        
      </div>
    </div>
  );
};

export default PostPreview;