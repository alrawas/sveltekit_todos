import { MongoClient } from 'mongodb';

const uri = import.meta.env.VITE_MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (!import.meta.env.VITE_MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (import.meta.env.VITE_NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
