import React from 'react';
import { Author } from '../../api-client/posts';
import { PostAuthor } from '../PostAuthor';
import { AvatarSize } from '../Avatar';
import styles from './styles.module.scss';

interface Props {
  avatarSize: AvatarSize;
  author: Author;
  created: string;
};

export const PostDetail = ({ avatarSize, author, created }: Props): JSX.Element => {
  return (
    <div className={styles.postDetail}>
      <PostAuthor avatarSize={avatarSize} author={author} />
      <p className={styles.postCreated}>{created}</p>
    </div>
  );
};

export default PostDetail;