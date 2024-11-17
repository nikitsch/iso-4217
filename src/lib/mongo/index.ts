import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URL;
const options = {};

if (!uri) throw new Error('Please add your Mongo URI');

const client: MongoClient = new MongoClient(uri, options);
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
