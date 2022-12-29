import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/cs';

dayjs.locale('cs');

const CLOUD_URL = `https://${process.env.CLOUD_ID}.directus.app`;

export interface Post {
  id: number;
  title: string;
  image: string;
  lead: string;
  draft: boolean;
  created: string;
  author: string;
  body: string;
}

export const getAllPosts = async (): Promise<Post[]> => {
  const query = (
    'fields=id,title,image,lead,created,publish,author.display_name&filter[publish][_eq]=true&sort=-created'
  );
  const response = await axios.get(`${CLOUD_URL}/items/posts?${query}`);
  const posts = response.data.data;
  return posts.map((post: any) => ({
    ...post,
    image: `${CLOUD_URL}/assets/${post.image}`,
    created: dayjs(post.created).format('D. MMMM YYYY H:mm'),
    author: post.author.display_name,
  }));
}

export const getOnePost = async (id: number): Promise<Post | null> => {
  const response = await axios.get(`${CLOUD_URL}/items/posts/${id}`);
  const post = response.data.data;

  return {
    ...post,
    image: `${CLOUD_URL}/assets/${post.image}`,
    created: dayjs(post.created).format('D. MMMM YYYY H:mm'),
  };
}
