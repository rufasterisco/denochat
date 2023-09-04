import {
  Collection,
  MongoClient,
  ObjectId,
} from "https://deno.land/x/mongo@v0.32.0/mod.ts";

export interface MessageSchema {
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

  public async init(): Promise<void> {
    await this.#client.connect(URL);
    this.#messages = this.#client.database(DB_NAME).collection("messages");
  }

  public async insertMessage(message: string): Promise<void> {
    await this.#messages.insertOne({
      message,
    });
  }

  public async findAllMessages(): Promise<MessageSchema[]> {
    return await this.#messages.find({}).toArray();
  }

  public async deleteMessage() {
    await this.#messages.delete({});
  }
}

async function initializeDatabase(): Promise<MongoDB> {
  const db: MongoDB = new MongoDB();
  await db.init();
  return db;
}

// Initialization
const database: MongoDB = await initializeDatabase();
export { database };
