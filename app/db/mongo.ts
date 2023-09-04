import { MongoClient } from "npm:mongodb";

// insert
export async function insert(message: string) {
  // Connection URL
  const url = "mongodb://root:rootpassword@localhost:27017";
  const client = new MongoClient(url);

  // Database Name
  const dbName = "chat";

  await client.connect();
  const db = client.db(dbName);
  const messages = db.collection("messages");

  const x = await messages.insertOne({
    message,
  });
  console.log(x);
  return x;
}

// find
export async function find() {
  // Connection URL
  const url = "mongodb://root:rootpassword@localhost:27017";
  const client = new MongoClient(url);

  // Database Name
  const dbName = "chat";

  await client.connect();
  const db = client.db(dbName);
  const messages = db.collection("messages");
  return await messages.find({}).toArray();
}
