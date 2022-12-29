import React from 'react';
import { Author } from '../../api-client/posts';
import { Avatar, AvatarSize } from '../Avatar';
import styles from './styles.module.scss';

interface Props {
  avatarSize: AvatarSize;
  author: Author;
};

export const PostAuthor = ({ avatarSize, author }: Props): JSX.Element => {
  const { name, avatarUrl } = author;
  return (
    <div className={styles.postAuthor}>
      <Avatar size={avatarSize} imageUrl={avatarUrl} />
      <p className={styles.authorName}>{name}</p>
    </div>
  );
};

export default Avatar;