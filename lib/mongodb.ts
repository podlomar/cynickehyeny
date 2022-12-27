import { MongoClient } from 'mongodb';
import dayjs from 'dayjs';
import 'dayjs/locale/cs';

dayjs.locale('cs');

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const client = new MongoClient(process.env.MONGODB_URI);
const clientPromise = client.connect();

export interface Post {
  slug: string;
  time: string;
  title: string;
  image: string;
  lead: string;
}

export const getAllPosts = async (): Promise<Post[]> => {
  const connection = await clientPromise;
  const db = connection.db('hyenydb');
  return db.collection<Post>('posts')
    .find({}, { projection: { _id: false }})
    .map((post): Post => ({
      ...post,
      image: `${process.env.POSTS_ASSETS}/${post.slug}.jpg`,
      time: dayjs(post.time).format('D. MMMM YYYY H:mm')
    }))
    .toArray();
}

export const getOnePost = async (slug: string): Promise<Post | null> => {
  const connection = await clientPromise;
  const db = connection.db('hyenydb');
  const post = await db.collection<Post>('posts').findOne({ slug });

  console.log('post', slug, post);
  if (post === null) {
    return null;
  }
  
  return post;
}


export default clientPromise;
