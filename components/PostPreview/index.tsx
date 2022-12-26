import React from 'react';
import styles from './styles.module.scss';

interface Props {
  title: string,
  lead: string,
};

export const PostPreview = ({ title, lead }: Props): JSX.Element => {
  return (
    <div className={styles.postPreview}>
      <h2 className={styles.postPreviewTitle}>{title}</h2>
      <p>{lead}</p>
    </div>
  );
};

export default PostPreview;