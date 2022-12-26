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
      <Link href={`posts/${slug}`}>
        <h2 className={styles.postPreviewTitle}>{title}</h2>
      </Link>
      <p>{lead}</p>
    </div>
  );
};

export default PostPreview;