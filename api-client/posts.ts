import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/cs';

dayjs.extend(relativeTime);
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

const createPostFromApi = (data: any): Post => {
  return {
    id: data.id,
    title: data.title,
    image: `${CLOUD_URL}/assets/${data.image}`,
    lead: data.lead ?? '',
    created: dayjs(data.date_created).fromNow(),
    author: {
      name: data.user_created.display_name,
      avatarUrl: `${CLOUD_URL}/assets/${data.user_created.avatar}`,
    },
    body: data.body ?? '',
  };
};

export const fetchAllPosts = async (): Promise<Post[]> => {
  const query = (
    'fields=id,title,image,lead,date_created,user_created.display_name,user_created.avatar&sort=-date_created'
  );
  const response = await axios.get(`${CLOUD_URL}/items/posts?${query}`);
  return response.data.data.map(createPostFromApi);
}

export const fetchOnePost = async (id: string): Promise<Post | null> => {
  const query = (
    'fields=id,title,image,lead,body,date_created,user_created.display_name,user_created.avatar'
  );
  const response = await axios.get(`${CLOUD_URL}/items/posts/${id}?${query}`);
  return createPostFromApi(response.data.data);
};
