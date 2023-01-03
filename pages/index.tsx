import React from 'react';
import { GetServerSidePropsResult } from 'next';
import { fetchAllPosts, Post } from '../api-client';
import PostPreview from '../components/PostPreview';
import PageLayout from '../components/PageLayout';

interface Props {
  posts: Post[],
}

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<Props>> => {
  const posts = await fetchAllPosts();
  return {
    props: { posts },
  }
}

const HomePage = ({ posts }: Props): JSX.Element => {
  return (
    <PageLayout activeNav="home">
      <img src="banner.svg" className="banner" />
      <h1 className="siteTitle">Cynické hyeny</h1>
      {posts.map((post) => <PostPreview key={post.id} post={post} />)}
    </PageLayout>
  );
};

export default HomePage;
