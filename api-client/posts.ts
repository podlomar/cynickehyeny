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
  body: string;
}

export const getAllPosts = async (): Promise<Post[]> => {
  const response = await axios.get(`${CLOUD_URL}/items/posts?filter[publish][_eq]=true`);
  const posts = response.data.data as Post[];
  return posts.map((post) => ({
    ...post,
    image: `${CLOUD_URL}/assets/${post.image}`,
    created: dayjs(post.created).format('D. MMMM YYYY H:mm')
  }));
}

export const getOnePost = async (id: number): Promise<Post | null> => {
  const response = await axios.get(`${CLOUD_URL}/items/posts/${id}`);
  const post = response.data.data as Post;

  return {
    ...post,
    image: `${CLOUD_URL}/assets/${post.image}`,
  };
}
