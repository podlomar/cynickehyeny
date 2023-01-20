import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { fetchOnePost, Post } from '../../../api-client';
import Link from 'next/link';
import Head from 'next/head';
import PostDetail from '../../../components/PostDetail';
import styles from './styles.module.scss';
import PageLayout from '../../../components/PageLayout';

interface Props {
  post: Post;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> => {
  const { id } = context.query;
  if (id === undefined) {
    return {
      notFound: true,
    };
  }
  
  const post = await fetchOnePost(String(id));
  if (post === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
  };
};

const Post = ({ post }: Props) => {
  const { id, title, author, published, image, lead, leadStripped, body } = post;
  return (
    <PageLayout title={title} activeNav="home">
      <Head>
        <meta property="og:site_name" content="Cynické hyeny" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="cs_CZ" />
        <meta property="og:url" content={`https://cynickehyeny.cz/posts/${id}`} />
        <meta property="og:title" content={`${title} | Cynické hyeny`} />
        <meta property="og:description" content={leadStripped} />  
        <meta property="og:image" content={image === null ? '/noimage.jpg' : image.url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CynickeHyeny" />
        <meta name="twitter:title" content={`${title} | Cynické hyeny`} />
        <meta name="twitter:description" content={leadStripped} />
        <meta name="twitter:image" content={image === null ? '/noimage.jpg' : image.url} />
      </Head>
      
      <Link href="/">&lt;&lt; zpět na hlavní stránku</Link>
      <h1 className={styles.postTitle}>{title}</h1>
      <PostDetail avatarSize="medium" author={author} published={published} />
      <div dangerouslySetInnerHTML={{__html: lead }}></div>
      { image === null ? (
        <img alt="Bez obrázku" className={styles.postImage} src="/noimage.jpg" />
      ) : (
        <img alt={image.title || title} className={styles.postImage} src={image.url} />
      )}
      { image === null ? null : (
        <div className={styles.attribution} dangerouslySetInnerHTML={{__html: image.attribution || ''}} />
      )}
      <div className={styles.postBody} dangerouslySetInnerHTML={{__html: body }} />
      <Link href="/">&lt;&lt; zpět na hlavní stránku</Link>
    </PageLayout>
  );
};

export default Post;
