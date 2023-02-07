import axios from 'axios';
import MarkdownIt from 'markdown-it';
import Directive from 'markdown-it-directive';
import StateInline from 'markdown-it/lib/rules_inline/state_inline';
import removeMd from 'remove-markdown';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/cs';

const md = MarkdownIt()
  .use(Directive)
  .use((md) => {
    // @ts-ignore
    md.inlineDirectives['sup'] = (state: StateInline, content: string) => {
      const token = state.push('html_inline', '', 0);
      token.content = `<sup>${content}</sup>`;
    };
    // @ts-ignore
    md.inlineDirectives['sub'] = (state: StateInline, content: string) => {
      const token = state.push('html_inline', '', 0);
      token.content = `<sub>${content}</sub>`;
    };
  });

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
  } | null,
  lead: string;
  leadStripped: string;
  published: string;
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
  image: data.image === null || data.image.width !== 1000 || data.image.height !== 500 ? null : {
    url: `${BACKOFFICE_URL}/assets/${data.image.id}`,
    title: data.image.title,
    attribution: md.render(data.image.attribution ?? ''),
  },
  lead: md.render(data.lead ?? ''),
  leadStripped: removeMd(data.lead ?? ''),
  published: dayjs(data.date_published).fromNow(),
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

export interface PostsSlice {
  posts: Post[],
  nextOffset: number | null,
  prevOffset: number | null,
}

export const fetchPosts = async (offset: number = 0): Promise<PostsSlice> => {
  const limit = 12;
  offset = Number.isNaN(offset) || offset > Number.MAX_SAFE_INTEGER
    ? 0
    : Math.floor(offset / limit) * limit;
  
  const query = [
    (
      'fields=id,title,image.id,image.title,image.attribution,image.width,image.height,lead,date_published,' + 
      'user_created.id,user_created.display_name,user_created.avatar&sort=-date_published'
    ),
    `offset=${offset.toFixed()}`,
    `limit=${limit + 1}`,
  ].join('&');

  const response = await axios.get(`${BACKOFFICE_URL}/items/posts?${query}`);
  const posts = response.data.data;

  return {
    posts: posts.slice(0, limit).map(createPostFromApi),
    nextOffset: posts.length > limit ? offset + limit : null,
    prevOffset: offset > 0 ? offset - limit : null,
  };
}

export const fetchOnePost = async (id: string): Promise<Post | null> => {
  const query = (
    'fields=id,title,image.id,image.title,image.attribution,image.width,image.height,lead,body,date_published,' +
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