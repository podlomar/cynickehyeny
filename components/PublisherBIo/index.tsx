import React from 'react';
import { Publisher } from '../../api-client';
import Avatar from '../Avatar';
import styles from './styles.module.scss';

interface Props {
  publisher: Publisher;
};

export const PublisherBio = ({ publisher }: Props): JSX.Element => {
  const { id, name, description, avatarUrl } = publisher;
  
  return (
    <div id={id} className={styles.publisherBio}>
      <div className={styles.publisherAvatar}>
        <Avatar size="large" imageUrl={avatarUrl} />
      </div>
      <div className={styles.publisherBody}>
        <h2>{name}</h2>
        <p>{description}</p>  
      </div>
    </div>
  );
};

export default PublisherBio;