import React from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Link from 'next/link';
import { fetchPosts, Post, PostsSlice } from '../api-client';
import PostPreview from '../components/PostPreview';
import PageLayout from '../components/PageLayout';
import styles from './styles.module.scss';

interface Props {
  postsSlice: PostsSlice,
}

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  const { offset } = context.query;
  const postsSlice = await fetchPosts(Number(offset));
  
  return {
    props: { postsSlice },
  }
}

const HomePage = ({ postsSlice }: Props): JSX.Element => {
  return (
    <PageLayout activeNav="home">
      <img alt="Banner" src="banner.svg" className="banner" />
      <h1>Cynické hyeny</h1>
      {postsSlice.posts.map((post) => <PostPreview key={post.id} post={post} />)}

      <div className={styles.pagination}>
        { postsSlice.prevOffset !== null
          ? (
            <Link href={postsSlice.prevOffset === 0 ? './' : `./?offset=${postsSlice.prevOffset}`}>
              &lt;&lt; Novější články
            </Link>
          ) : <span />
        }
        { postsSlice.nextOffset !== null
          ? <Link href={`./?offset=${postsSlice.nextOffset}`}>Starší články &gt;&gt;</Link>
          : <span />
        }
      </div>
    </PageLayout>
  );
};

export default HomePage;
