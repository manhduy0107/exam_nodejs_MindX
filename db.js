import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;

const db = {};

const connectToDb = () => {
  const client = new MongoClient("mongodb://localhost:27017");
  client.connect(() => {
    const database = client.db("test_mindX");
    db.inventories = database.collection("inventories");
    db.orders = database.collection("orders");
    db.users = database.collection("users");
  });
};

export { connectToDb, db };
