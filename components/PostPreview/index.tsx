import React from 'react';
import Link from 'next/link';
import { Post } from '../../api-client/posts';
import PostDetail from '../PostDetail';
import styles from './styles.module.scss';

interface Props {
  post: Post;
};

export const PostPreview = ({ post }: Props): JSX.Element => {
  const { id, title, author, created, image, lead } = post;
  return (
    <div className={styles.postPreview}>
      <div className={styles.postPreviewHead}>
        <img 
          className={styles.postPreviewImage}
          src={image}
        />
        <div className={styles.postPreviewInfo}>
          <h2 className={styles.postPreviewTitle}>
            <Link href={`posts/${id}`}>
              {title}
            </Link>
          </h2>
          <PostDetail avatarSize="small" author={author} created={created} />
        </div>
      </div>
      <p className={styles.postPreviewLead}>{lead}</p>
      <div className={styles.postPreviewFoot}>
        <Link className="btnLink" href={`posts/${id}`}>Celý článek</Link>
      </div>
    </div>
  );
};

export default PostPreview;