import React from 'react';
import { Author } from '../../api-client';
import { PostAuthor } from '../PostAuthor';
import { AvatarSize } from '../Avatar';
import styles from './styles.module.scss';

interface Props {
  avatarSize: AvatarSize;
  author: Author;
  published: string;
};

export const PostDetail = ({ avatarSize, author, published }: Props): JSX.Element => {
  return (
    <div className={styles.postDetail}>
      <PostAuthor avatarSize={avatarSize} author={author} />
      <p className={styles.postPublished}>{published}</p>
    </div>
  );
};

export default PostDetail;