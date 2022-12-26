import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const client = new MongoClient(process.env.MONGODB_URI);
const clientPromise = client.connect();

export interface Post {
  slug: string;
  title: string;
  lead: string;
}

export const getAllPosts = async (): Promise<Post[]> => {
  const connection = await clientPromise;
  const db = connection.db('hyenydb');
  return db.collection<Post>('posts').find({}, { projection: { _id: false }}).toArray();
}

export const getOnePost = async (slug: string): Promise<Post | null> => {
  const connection = await clientPromise;
  const db = connection.db('hyenydb');
  const post = await db.collection<Post>('posts').findOne({ slug });

  if (post === null) {
    return null;
  }
  
  return post;
}


export default clientPromise;
