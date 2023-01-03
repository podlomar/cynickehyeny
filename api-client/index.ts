import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/cs';

const BACKOFFICE_URL = process.env.BACKOFFICE_URL;

dayjs.extend(relativeTime);
dayjs.locale('cs');

export interface Author {
  id: string;
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

export interface Publisher {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
}

const createPostFromApi = (data: any): Post => ({
  id: data.id,
  title: data.title,
  image: `${BACKOFFICE_URL}/assets/${data.image}`,
  lead: data.lead ?? '',
  created: dayjs(data.date_created).fromNow(),
  author: {
    id: data.user_created.id,
    name: data.user_created.display_name,
    avatarUrl: `${BACKOFFICE_URL}/assets/${data.user_created.avatar}`,
  },
  body: data.body ?? '',
});

const createPublisherFromApi = (data: any): Publisher => ({
  id: data.id,
  name: data.display_name ?? 'Nastav si jméno, vole!',
  description: data.description ?? 'Nastav si popisek, vole!',
  avatarUrl: `${BACKOFFICE_URL}/assets/${data.avatar}`,
});

export const fetchAllPosts = async (): Promise<Post[]> => {
  const query = (
    'fields=id,title,image,lead,date_created,' + 
    'user_created.id,user_created.display_name,user_created.avatar&sort=-date_created'
  );
  const response = await axios.get(`${BACKOFFICE_URL}/items/posts?${query}`);
  return response.data.data.map(createPostFromApi);
}

export const fetchOnePost = async (id: string): Promise<Post | null> => {
  const query = (
    'fields=id,title,image,lead,body,date_created,' +
    'user_created.id,user_created.display_name,user_created.avatar'
  );
  const response = await axios.get(`${BACKOFFICE_URL}/items/posts/${id}?${query}`);
  return createPostFromApi(response.data.data);
};

export const fetchPublishers = async (): Promise<Publisher[]> => {
  const response = await axios.get(`${BACKOFFICE_URL}/users`);
  return response.data.data.map(createPublisherFromApi);
};