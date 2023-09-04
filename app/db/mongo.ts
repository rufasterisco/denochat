import {
  Collection,
  MongoClient,
  ObjectId,
} from "https://deno.land/x/mongo@v0.32.0/mod.ts";

interface MessageSchema {
  _id: ObjectId;
  message: string;
}
const URL = "mongodb://root:rootpassword@localhost:27017";
const DB_NAME = "chat";

export class MongoDB {
  #client: MongoClient;
  // Using assertion operator, i will call the async init before exporting
  #messages!: Collection<MessageSchema>;

  constructor() {
    this.#client = new MongoClient();
  }

  public async init() {
    await this.#client.connect(URL);
    this.#messages = this.#client.database(DB_NAME).collection("messages");
  }

  public async insertMessage(message: string) {
    return await this.#messages.insertOne({
      message,
    });
  }

  public async findAllMessages() {
    return await this.#messages.find({}).toArray();
  }
}

async function initializeDatabase() {
  const db = new MongoDB();
  await db.init();
  return db;
}

// Initialization
const database = await initializeDatabase();
export { database };
