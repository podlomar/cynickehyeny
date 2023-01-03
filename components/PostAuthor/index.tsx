import Link from 'next/link';
import React from 'react';
import { Author } from '../../api-client';
import { Avatar, AvatarSize } from '../Avatar';
import styles from './styles.module.scss';

interface Props {
  avatarSize: AvatarSize;
  author: Author;
};

export const PostAuthor = ({ avatarSize, author }: Props): JSX.Element => {
  const { id, name, avatarUrl } = author;
  return (
    <div className={styles.postAuthor}>
      <Avatar size={avatarSize} imageUrl={avatarUrl} />
      <Link href={`/o-nas#${id}`} className={styles.authorName}>{name}</Link>
    </div>
  );
};

export default Avatar;