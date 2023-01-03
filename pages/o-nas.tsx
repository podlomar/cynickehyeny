import React from 'react';
import { GetStaticPropsResult } from 'next';
import { fetchPublishers,  Publisher } from '../api-client';
import PageLayout from '../components/PageLayout';
import PublisherBio from '../components/PublisherBIo';

interface Props {
  publishers: Publisher[],
}

export const getStaticProps = async (): Promise<GetStaticPropsResult<Props>> => {
  const publishers = await fetchPublishers();
  return {
    props: { publishers },
  }
}

const HomePage = ({ publishers }: Props): JSX.Element => {
  return (
    <PageLayout activeNav="about">
      {publishers.map((pub) => <PublisherBio key={pub.id} publisher={pub} />)}
    </PageLayout>
  );
};

export default HomePage;
