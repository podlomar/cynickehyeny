import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { deleteSubscriber } from '../../api-client';
import MessagePage from '../../components/MessagePage';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{}>> => {
  const { id } = context.query;
  if (id === undefined) {
    return {
      notFound: true,
    };
  }
  
  const result = await deleteSubscriber(id as string);
  if (result === 'error') {
    return {
      notFound: true,
    };
  }

  return {
    props: {}
  };
};

const UnsubscribePage = (): JSX.Element => (
  <MessagePage head="Odběr novinek zrušen">
    <p>
      Bylo to krásné, ale všechno jednou končí. Teď se chvíli nebudeme vídat, ale třeba
      se za nějakou dobu potkáme jako kamarádi.
    </p>
  </MessagePage>
);

export default UnsubscribePage;
