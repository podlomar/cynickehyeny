import axios from 'axios';
import MarkdownIt from 'markdown-it';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/cs';

const md = MarkdownIt();

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
  image: {
    url: string;
    title: string | null;
    attribution: string | null;
  },
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

export interface Subscription {
  id: string;
  email: string;
}

const createPostFromApi = (data: any): Post => ({
  id: data.id,
  title: data.title,
  image: {
    url: `${BACKOFFICE_URL}/assets/${data.image.id}`,
    title: data.image.title,
    attribution: md.render(data.image.attribution ?? ''),
  },
  lead: md.render(data.lead ?? ''),
  created: dayjs(data.date_created).fromNow(),
  author: {
    id: data.user_created.id,
    name: data.user_created.display_name,
    avatarUrl: `${BACKOFFICE_URL}/assets/${data.user_created.avatar}`,
  },
  body: md.render(data.body ?? ''),
});

const createPublisherFromApi = (data: any): Publisher => ({
  id: data.id,
  name: data.display_name ?? 'Nastav si jméno, vole!',
  description: md.render(data.description ?? ''),
  avatarUrl: `${BACKOFFICE_URL}/assets/${data.avatar}`,
});

export const fetchAllPosts = async (): Promise<Post[]> => {
  const query = (
    'fields=id,title,image.id,image.title,image.attribution,lead,date_created,' + 
    'user_created.id,user_created.display_name,user_created.avatar&sort=-date_created'
  );
  const response = await axios.get(`${BACKOFFICE_URL}/items/posts?${query}`);
  return response.data.data.map(createPostFromApi);
}

export const fetchOnePost = async (id: string): Promise<Post | null> => {
  const query = (
    'fields=id,title,image.id,image.title,image.attribution,lead,body,date_created,' +
    'user_created.id,user_created.display_name,user_created.avatar'
  );
  const response = await axios.get(`${BACKOFFICE_URL}/items/posts/${id}?${query}`);
  return createPostFromApi(response.data.data);
};

export const fetchPublishers = async (): Promise<Publisher[]> => {
  const response = await axios.get(`${BACKOFFICE_URL}/users`);
  return response.data.data.map(createPublisherFromApi);
};

export const addSubscriber = async (email: string): Promise<Subscription | 'error'> => {
  const r1 = await axios.get(`${BACKOFFICE_URL}/items/subscribers?filter[email][_eq]=${email}`);
  
  if (r1.data.data.length > 0) {
    return {
      id: r1.data.data[0].id,
      email,
    }
  }
  
  const r2 = await axios.post(`${BACKOFFICE_URL}/items/subscribers`, { email });
  if (r2.status === 200) {
    return {
      id: r2.data.data.id,
      email: r2.data.data.email,
    };
  }

  return 'error';
}

export const deleteSubscriber = async (id: string): Promise<'success' | 'error'> => {
  const response = await axios.delete(`${BACKOFFICE_URL}/items/subscribers/${id}`);
  if (response.status === 204) {
    return 'success';
  }

  return 'error';
}