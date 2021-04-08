import fs from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';

import { connectDatabase, insertDocument } from '../../helpers/db-utils';


/*
async function connectDatabase() {
  const url = 'mongodb+srv://derek:fhbxgIgd3PQ88HQg@cluster0-ijflg.mongodb.net/events';
  const client = await MongoClient.connect(url);

  return client;
};


async function insertDocument(client, document) {
  const db = client.db();
  // const newEmail = await db.collection('newsletter').insertOne({ email: email });
  // await db.collection('newsletter').insertOne({ email: email });
  await db.collection('newsletter').insertOne(document);
};
*/


const handler =  async (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email;

    if (!email || email.trim() === '' || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' })
      return;
    };


    /*
    const url = 'mongodb+srv://derek:fhbxgIgd3PQ88HQg@cluster0-ijflg.mongodb.net/newsletter';
    
    // MongoClient.connect(url, clients => {})
    MongoClient.connect(url)
      .then(client => {
        // console.log('Connected successfully to server');
        const db = client.db();   // client.db('newsletter')

        // db.collection('emails').insertOne({ email: email }).then()  // returns a promise
        return db.collection('emails').insertOne({ email: email })  // we can just return this
      })
      .then()
    */


    let client;
    try {
      // const url = 'mongodb+srv://derek:fhbxgIgd3PQ88HQg@cluster0-ijflg.mongodb.net/events';
      // const client = await MongoClient.connect(url);
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: 'Failed to connect to database' });
      return;
    };

    
    let newEmail;
    try {
       // const db = client.db();
      // const newEmail = await db.collection('newsletter').insertOne({ email: email });
      newEmail = await insertDocument(client, 'newsletter', { email: email });
      client.close();
    } catch (err) {
      res.status(500).json({ message: 'Inserting data failed' });
      return;
    };


    res.status(201).json({ message: 'Success', email: newEmail })


    /*
    const newEmail = {
      id: Math.random(),
      email
    };

    const filePath = path.join(process.cwd(), 'data', 'register.json');
    const fileData = fs.readFileSync(filePath);  
    const data = JSON.parse(fileData);  // need to convert json data to javascript object (the data will be an array)
    data.push(newEmail);
    fs.writeFileSync(filePath, JSON.stringify(data));  // write the json converted data to file

    res.status(201).json({ message: 'Success', email: newEmail })
    */

  }

};


export default handler;