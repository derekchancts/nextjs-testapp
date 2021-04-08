import { MongoClient } from "mongodb";
import { connectDatabase, insertDocument, getAllDocuments } from '../../../helpers/db-utils';


const handler = async (req, res) => {
  const eventId = req.query.eventId;

  // MONGODB CONNECTION
  // const url = "mongodb+srv://derek:fhbxgIgd3PQ88HQg@cluster0-ijflg.mongodb.net/events";
  // const client = await MongoClient.connect(url);

  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: 'Failed to connect to database' });
    return;
  };


  if (req.method === "POST") {
    // ADD SERVER SIDE VALIDATION
    const { email, name, text } = req.body;

    if (
      !email ||
      email.trim() === "" ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      client.close();
      return;
    }

    const newComment = {
      // id: Math.random(),
      email,
      name,
      text,
      eventId,
    };


    let result;
    try {
       // ADD DATA ONTO MONGODB
      // const db = client.db();
      // const result = await db.collection("comments").insertOne(newComment);
      // console.log(result);
      result = await insertDocument(client, 'comments', newComment);

      newComment._id = result.insertedId; // add MongoDB document id for the document added

      res.status(201).json({ message: "Added comment", comment: newComment });
    } catch (err) {
      res.status(500).json({ message: 'Inserting data failed' });
      // return;  // remove the retun here, so to make sure that we will "close" the connection at the bottom
    }
   
  };



  if (req.method === "GET") {
    // const dummyList = [
    //   { id: 'c1', name: 'Chan', text: 'A first Comment'},
    //   { id: 'c2', name: 'Derek', text: 'A second Comment'},
    //   { id: 'c3', name: 'Lok', text: 'A third Comment'},
    // ];

    // const db = client.db();
    // const documents = await db
    //   .collection("comments")
    //   .find()
    //   .sort({ _id: -1 })   // descending order
    //   .toArray();

    // console.log(documents)

    try {
      const documents = await getAllDocuments(client, 'comments', { _id: -1 })

      res.status(200).json({ comments: documents });
    } catch (err) {
      res.status(500).json({ message: 'Failed to load documents' });
      // return;  // remove the retun here, so to make sure that we will "close" the connection below
    }

  }

  client.close();
};

export default handler;
