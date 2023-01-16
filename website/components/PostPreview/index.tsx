import React from 'react';
import Link from 'next/link';
import { Post } from '../../api-client';
import PostDetail from '../PostDetail';
import styles from './styles.module.scss';

interface Props {
  post: Post;
};

export const PostPreview = ({ post }: Props): JSX.Element => {
  const { id, title, author, published, image, lead } = post;
  return (
    <div className={styles.postPreview}>
      <div className={styles.postPreviewHead}>
        <Link href={`posts/${id}`}>
          { image === null ? (
            <img
              alt="Bez obrázku"
              className={styles.postPreviewImage}
              src="/noimage.jpg"
            />  
          ) : (
            <img
              alt={image.title || title}
              className={styles.postPreviewImage}
              src={image.url}
            />
          )}
        </Link>
        <div className={styles.postPreviewInfo}>
          <h2 className={styles.postPreviewTitle}>
            <Link href={`posts/${id}`}>{title}</Link>
          </h2>
          <PostDetail avatarSize="small" author={author} published={published} />
        </div>
      </div>
      <div className={styles.postPreviewLead} dangerouslySetInnerHTML={{ __html: lead}} />
      <div className={styles.postPreviewFoot}>
        <Link className="btnLink" href={`posts/${id}`}>Celý článek</Link>
      </div>
    </div>
  );
};

export default PostPreview;