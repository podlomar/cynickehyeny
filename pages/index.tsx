import React from 'react';
import { GetServerSidePropsResult } from 'next';
import { fetchAllPosts, Post } from '../api-client/posts';
import PostPreview from '../components/PostPreview';

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
    <div className="container">
      <img src="banner.svg" className="banner" />
      <h1 className="siteTitle">Cynické hyeny</h1>
      {posts.map((post) => <PostPreview key={post.id} post={post} />)}
    </div>
  );
};

export default HomePage;
