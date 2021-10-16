import clientPromise from '$lib/db';
import { ObjectId } from 'mongodb';

export async function get(request) {
  try {
    const completed = request.query.get('completed') === 'true' ? true : false;

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('sveltekit-todos');
    const todos = await collection.find({ completed }).toArray();

    return {
      status: 200,
      body: {
        todos,
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

export async function post(request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('sveltekit-todos');

    const todo = JSON.parse(request.body);
    collection.insertOne(todo);

    return {
      status: 200,
      body: {
        status: 'Success',
      },
    };
  } catch (err) {
    return {
      status: 500,
      body: {
        error: 'A server error occured:' + err,
      },
    };
  }
}

export async function put(request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('sveltekit-todos');

    const todo = JSON.parse(request.body);
    collection.update(
       {_id: ObjectId(todo._id)} ,
       {$set: { completed: todo.completed } }
    );

    return {
      status: 200,
      body: {
        status: 'Success',
      },
    };
  } catch (err) {
    return {
      status: 500,
      body: {
        error: 'A server error occured:' + err,
      },
    };
  }
}

export async function del(request) {
  // later
}
