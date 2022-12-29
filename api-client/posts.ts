import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/cs';

dayjs.locale('cs');

const CLOUD_URL = `https://${process.env.CLOUD_ID}.directus.app`;

export interface Author {
  name: string;
  avatarUrl: string;
}

export interface Post {
  id: number;
  title: string;
  image: string;
  lead: string;
  draft: boolean;
  created: string;
  author: Author;
  body: string;
}

export const getAllPosts = async (): Promise<Post[]> => {
  const query = (
    'fields=id,title,image,lead,created,author.display_name,author.avatar&filter[publish][_eq]=true&sort=-created'
  );
  const response = await axios.get(`${CLOUD_URL}/items/posts?${query}`);
  const posts = response.data.data;
  return posts.map((post: any) => ({
    ...post,
    image: `${CLOUD_URL}/assets/${post.image}`,
    created: dayjs(post.created).format('D. MMMM YYYY H:mm'),
    author: {
      name: post.author.display_name,
      avatarUrl: `${CLOUD_URL}/assets/${post.author.avatar}`,
    },
  }));
}

export const getOnePost = async (id: number): Promise<Post | null> => {
  const query = (
    'fields=title,image,lead,body,created,author.display_name,author.avatar'
  );
  const response = await axios.get(`${CLOUD_URL}/items/posts/${id}?${query}`);
  const post = response.data.data;

  return {
    ...post,
    image: `${CLOUD_URL}/assets/${post.image}`,
    created: dayjs(post.created).format('D. MMMM YYYY H:mm'),
    author: {
      name: post.author.display_name,
      avatarUrl: `${CLOUD_URL}/assets/${post.author.avatar}`,
    },
  };
};
