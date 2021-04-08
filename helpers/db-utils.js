import { MongoClient } from 'mongodb';


export async function connectDatabase() {
  const url = 'mongodb+srv://derek:fhbxgIgd3PQ88HQg@cluster0-ijflg.mongodb.net/events';
  const client = await MongoClient.connect(url);

  return client;
};


export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);

  return result;
};


export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db
      .collection(collection)
      .find()
      .sort(sort)   
      .toArray();

  return documents;
}