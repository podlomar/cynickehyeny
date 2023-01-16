import React from 'react';
import { GetServerSidePropsResult } from 'next';
import MarkdownIt from 'markdown-it';
import { fetchPublishers,  Publisher } from '../api-client';
import PageLayout from '../components/PageLayout';
import PublisherBio from '../components/PublisherBIo';

const md = MarkdownIt();

interface Props {
  publishers: Publisher[],
}

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<Props>> => {
  const publishers = await fetchPublishers();
  return {
    props: { publishers },
  }
}

const HomePage = ({ publishers }: Props): JSX.Element => {
  return (
    <PageLayout title="O nás" activeNav="about">
      <h1>O nás</h1>
      <p>Jsme skupinka přátel, kterou jednou naše kamarádka ve víru vášnivé diskuse nazvala cynickými hyenami. Důvod prohlášení už zmizel v hlubinách dějin, ale pojmenování nám zůstalo.</p>

      <p>Během koronavirového lockdownu už nás přestalo bavit číst zprávy, protože v nich nebylo nic jiného než covid. Tak jsme se rozhodli udělat si vlastní. Formou mailového newsletteru posíláme (skoro) každý týden shrnutí a komentář zajímavostí, co se stalo ve světě a vy jste to možná nezaznamenali. Podmínkou je, že se nesmí jednat o nic spojeného s koronavirem.</p>

      <p>Nikdo z nás není novinář, nečekejte od nás tedy články odpovídající dobré žurnalistické praxi nebo nedejbože etice. Naše textíky by se spíš daly přirovnat k tomu, co vám povíme, když nám koupíte pivo v hospodě.</p>

      {publishers.map((pub) => <PublisherBio key={pub.id} publisher={pub} />)}
    </PageLayout>
  );
};

export default HomePage;
