import React from 'react';
import Link from 'next/link';
import PageLayout from '../PageLayout';
import styles from './styles.module.scss';

interface Props {
  head: string;
  children: React.ReactNode;
}

const MessagePage = ({ head, children }: Props): JSX.Element => {
  return (
    <PageLayout subscribe={false}>
      <h1 className={styles.head}>{head}</h1>
      <div className={styles.message}>
        {children}
        <Link href="/">Zpět na hlavní stránku</Link>
      </div>
    </PageLayout>
  );
};

export default MessagePage;
