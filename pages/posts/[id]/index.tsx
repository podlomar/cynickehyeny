import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import MarkdownIt from 'markdown-it';
import { getOnePost, Post } from '../../../api-client/posts';
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
      <h1>{title}</h1>
      <p>{lead}</p>
      <img className={styles.image} src={post.image} />
      <div dangerouslySetInnerHTML={{__html: body }} />
    </div>
  );
};

export default Post;
