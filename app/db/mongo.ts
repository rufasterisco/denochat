import {
  Collection,
  MongoClient,
  ObjectId,
} from "https://deno.land/x/mongo@v0.32.0/mod.ts";

export interface MessageSchema {
  _id: ObjectId;
  message: string;
  name: string;
}
// if the env var DB_HOST is set, host will be it, if not it'll be localhost
const DB_HOST = Deno.env.get("DB_HOST") || "localhost";
const URL = `mongodb://${DB_HOST}:27017`;

const DB_NAME = "chat";

export class MongoDB {
  #client: MongoClient;
  // Using assertion operator, i will call the async init before exporting
  #messages: Collection<MessageSchema>;

  constructor() {
    this.#client = new MongoClient();
  }

  public async init(): Promise<void> {
    await this.#client.connect(URL);
    this.#messages = await this.#client.database(DB_NAME).collection(
      "messages",
    );
  }

  public async insertMessage(
    message: string,
    name: string,
  ): Promise<void> {
    await this.#messages.insertOne({
      message,
      name,
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

  while (true) {
    try {
      await db.init();
      return db;
    } catch (error) {
      console.error(
        "Failed to initialize database. Retrying in 1 second.",
        error,
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

// Initialization
const database: MongoDB = await initializeDatabase();
export { database };
