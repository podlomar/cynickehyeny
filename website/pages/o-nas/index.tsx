import React from 'react';
import { GetServerSidePropsResult } from 'next';
import { fetchPublishers,  Publisher } from '../../api-client';
import PageLayout from '../../components/PageLayout';
import PublisherBio from '../../components/PublisherBIo';
import BuyMeACoffee from '../../components/BuyMeACoffee';
import styles from './styles.module.scss';

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
      <div className={styles.aboutUs}>
        <p>Jsme skupinka přátel, kterou jednou kdosi ve víru vášnivé diskuse nazval cynickými hyenami. Důvod prohlášení už zmizel v hlubinách dějin, ale pojmenování nám zůstalo.</p>

        <p>Během koronavirových lockdownů už nás přestalo bavit číst zprávy, protože v nich nebylo nic jiného než covid. Tak jsme se rozhodli udělat si vlastní (s blackjackem a s děvkama). Formou mailového newsletteru - a nově i vlastního webu - posíláme shrnutí a komentář zajímavostí, co se stalo ve světě a vy jste to možná nezaznamenali.</p>

        <p>Nikdo z nás není novinář, nečekejte od nás tedy články odpovídající dobré žurnalistické praxi nebo nedejbože etice. Naše textíky by se spíš daly přirovnat k tomu, co vám povíme, když nám koupíte pivo v hospodě.</p>

        <p>Pokud se vám naše články líbí, <a href="https://www.buymeacoffee.com/cynickehyeny.cz">kupte nám kafe!</a></p>
      
        <div className={styles.donate}>
          <BuyMeACoffee />
        </div>
      </div>
      {publishers.map((pub) => <PublisherBio key={pub.id} publisher={pub} />)}
    </PageLayout>
  );
};

export default HomePage;
