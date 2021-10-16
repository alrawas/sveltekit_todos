import clientPromise from '$lib/db';
import { ObjectId } from 'mongodb';

export async function get(request) {
  try {
    const id = request.params.slug;
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('sveltekit-todos');
    const todo = await collection.findOne({ _id : ObjectId(id) });

    return {
      status: 200,
      body: {
        todo,
      },
    };
  } catch (err) {
    return {
      status: 500,
      body: {
        error: 'A server error occured',
      },
    };
  }
}
