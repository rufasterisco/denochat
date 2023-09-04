import {
  MongoClient,
  ObjectId,
} from "https://deno.land/x/mongo@v0.32.0/mod.ts";

interface Message {
  _id: ObjectId;
  username: string;
  password: string;
}

// insert
export async function insert(message: string) {
  // Connection URL
  const client = new MongoClient();
  const url = "mongodb://root:rootpassword@localhost:27017";
  await client.connect(url);

  // Database Name
  const dbName = "chat";

  const messages = client.database(dbName).collection("messages");

  return await messages.insertOne({
    message,
  });
}

// find
export async function find() {
  // Connection URL
  const client = new MongoClient();
  const url = "mongodb://root:rootpassword@localhost:27017";
  await client.connect(url);

  // Database Name
  const dbName = "chat";

  const messages = client.database(dbName).collection("messages");
  return await messages.find({}).toArray();
}
