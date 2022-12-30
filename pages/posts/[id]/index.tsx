import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import MarkdownIt from 'markdown-it';
import { fetchOnePost, Post } from '../../../api-client/posts';
import Link from 'next/link';
import Topbar from '../../../components/Topbar';
import PostDetail from '../../../components/PostDetail';
import styles from './styles.module.scss';

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
    <div className="container">
      <Topbar />
      <Link href="/">&lt;&lt; zpět na hlavní stránku</Link>
      <h1 className={styles.postTitle}>{title}</h1>
      <PostDetail avatarSize="normal" author={author} created={created} />
      <p>{lead}</p>
      <img className={styles.postImage} src={post.image} />
      <div className={styles.postBody} dangerouslySetInnerHTML={{__html: body }} />
      <Link href="/">&lt;&lt; zpět na hlavní stránku</Link>
    </div>
  );
};

export default Post;
