import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import MarkdownIt from 'markdown-it';
import { getOnePost, Post } from '../../../api-client/posts';
import Topbar from '../../../components/Topbar';
import styles from './styles.module.scss';
import Link from 'next/link';

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
  
  const post = await getOnePost(Number(id));
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
  const { title, lead, body } = post;
  return (
    <div className="container">
      <Topbar />
      <Link href="/">&lt;&lt; zpět na hlavní stránku</Link>
      <h1 className={styles.postTitle}>{title}</h1>
      <p>{lead}</p>
      <img className={styles.postImage} src={post.image} />
      <div className={styles.postBody} dangerouslySetInnerHTML={{__html: body }} />
      <Link href="/">&lt;&lt; zpět na hlavní stránku</Link>
    </div>
  );
};

export default Post;
