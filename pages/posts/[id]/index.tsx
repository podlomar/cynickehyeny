import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import MarkdownIt from 'markdown-it';
import { fetchOnePost, Post } from '../../../api-client';
import Link from 'next/link';
import PostDetail from '../../../components/PostDetail';
import styles from './styles.module.scss';
import PageLayout from '../../../components/PageLayout';

const md = MarkdownIt();

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
    props: {
      post: {
        ...post,
        body: md.render(post.body),
      }
    },
  };
};

const Post = ({ post }: Props) => {
  const { title, author, created, lead, body } = post;
  return (
    <PageLayout activeNav="home">
      <Link href="/">&lt;&lt; zpět na hlavní stránku</Link>
      <h1 className={styles.postTitle}>{title}</h1>
      <PostDetail avatarSize="medium" author={author} created={created} />
      <p>{lead}</p>
      <img alt={title} className={styles.postImage} src={post.image} />
      <div className={styles.postBody} dangerouslySetInnerHTML={{__html: body }} />
      <Link href="/">&lt;&lt; zpět na hlavní stránku</Link>
    </PageLayout>
  );
};

export default Post;
