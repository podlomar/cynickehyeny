import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsResult } from 'next';
import MessagePage from '../../components/MessagePage';
import Link from 'next/link';

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<{}>> => {
  return {
    props: {}
  };
};

const SubscribedPage = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MessagePage head="Jste přihlášeni k odběru">
    <p>
      Děkujeme za vaši důvěru. Slibujeme, že ji nezklameme nechutným obtížným spamem.
    </p>

    <p>
      Pokud jste se příhlásili omylem, můžete se opět <Link href={`/unsubscribe/${id}`}>odhlásit</Link>
    </p>
    </MessagePage>
  )
};

export default SubscribedPage;
