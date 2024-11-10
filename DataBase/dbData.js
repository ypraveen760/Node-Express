const { MongoClient } = require("mongodb");
const { url } = require("../Key");

const client = new MongoClient(url);
const dbName = "HelloWorld";
const main = async () => {
  await client.connect();
  console.log("Connected Successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("User");
  //insert
  const data = {
    FirstName: "Pinta",
    LastName: "Chimba",
    City: "Bindak",
    PhoneNo: 8524654654,
  };
  const insert = await collection.insertMany([data]);
  console.log("Insert Document", insert);

  //update doc

  const updated = await collection.updateOne(
    { FirstName: "Pinta" },
    { $set: { FirstName: "Ganesh", LastName: "Yadav" } }
  );
  console.log("Updated Data", updated);

  //Delete DOC

  const dataTOBeDeleted = await collection.insertOne({
    FirstName: "Poko",
    LastName: "Choko",
    City: "Gotapuram",
    PhoneNo: "1111111111",
  });
  console.log("Data inserted", dataTOBeDeleted);
  const DataDelete = await collection.deleteMany({ FirstName: "Ganesh" });
  console.log("Data deleted", DataDelete);

  //read Document
  const findResult = await collection.find({ LastName: "Yadav" }).toArray();
  console.log("Found Document", findResult);

  return "Done.";
};

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close);
