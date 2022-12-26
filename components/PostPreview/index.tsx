import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

interface Props {
  slug: string,
  title: string,
  lead: string,
};

export const PostPreview = ({ slug, title, lead }: Props): JSX.Element => {
  return (
    <div className={styles.postPreview}>
      <img className={styles.postPreviewImage} src={`postimg/${slug}.jpg`} />
      <h2 className={styles.postPreviewTitle}>
        <Link href={`posts/${slug}`}>
          {title}
        </Link>
      </h2>
      <p>{lead}</p>
    </div>
  );
};

export default PostPreview;