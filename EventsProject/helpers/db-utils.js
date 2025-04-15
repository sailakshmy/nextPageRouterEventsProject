import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb://Groot:IAmGroot@ac-lpjqpry-shard-00-00.87nimnv.mongodb.net:27017,ac-lpjqpry-shard-00-01.87nimnv.mongodb.net:27017,ac-lpjqpry-shard-00-02.87nimnv.mongodb.net:27017/events?replicaSet=atlas-ejgl3x-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find()
    .sort(sort) // Sort by _id in descending order
    .toArray();
  return documents;
}
