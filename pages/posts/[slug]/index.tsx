import { promises as fs } from 'fs';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import MarkdownIt from 'markdown-it';
import { getOnePost } from '../../../lib/mongodb';
import styles from './styles.module.scss';

const md = MarkdownIt();

interface Props {
  slug: string,
  title: string,
  lead: string,
  content: string;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> => {
  const { slug } = context.query;
  if (slug === undefined) {
    return {
      notFound: true,
    };
  }
  
  const post = await getOnePost(slug.toString());
  const content = await fs.readFile(`${process.env.POSTS_FOLDER}/${slug}.md`, 'utf-8');
  
  if (post === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slug: post.slug,
      title: post.title,
      lead: post.lead,
      content: md.render(content),
    },
  };
};

const Post = ({ slug, title, lead, content }: Props) => {
  return (
    <div className="container">
      <h1>{title}</h1>
      <p>{lead}</p>
      <img className={styles.image} src={`/postimg/${slug}.jpg`} />
      <div dangerouslySetInnerHTML={{__html: content }} />
    </div>
  );
};

export default Post;
