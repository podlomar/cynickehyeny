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
  id: string;
  title: string;
  image: string;
  lead: string;
  created: string;
  author: Author;
  body: string;
}

export const getAllPosts = async (): Promise<Post[]> => {
  const query = (
    'fields=id,title,image,lead,date_created,user_created.display_name,user_created.avatar'
    // 'fields=id,title,image,lead,created,author.display_name,author.avatar&filter[publish][_eq]=true&sort=-created'
  );
  const response = await axios.get(`${CLOUD_URL}/items/posts?${query}`);
  const posts = response.data.data;
  return posts.map((post: any) => ({
    ...post,
    image: `${CLOUD_URL}/assets/${post.image}`,
    created: dayjs(post.date_created).format('D. MMMM YYYY'),
    author: {
      name: post.user_created.display_name,
      avatarUrl: `${CLOUD_URL}/assets/${post.user_created.avatar}`,
    },
  }));
}

export const getOnePost = async (id: string): Promise<Post | null> => {
  const query = (
    'fields=title,image,lead,body,date_created,user_created.display_name,user_created.avatar'
  );
  const response = await axios.get(`${CLOUD_URL}/items/posts/${id}?${query}`);
  const post = response.data.data;

  return {
    ...post,
    image: `${CLOUD_URL}/assets/${post.image}`,
    created: dayjs(post.date_created).format('D. MMMM YYYY'),
    author: {
      name: post.user_created.display_name,
      avatarUrl: `${CLOUD_URL}/assets/${post.user_created.avatar}`,
    },
  };
};
