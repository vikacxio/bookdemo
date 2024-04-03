const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
//const uri =  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";
//const client = new MongoClient(uri);
async function main() {


const uri = 'mongodb://user1:WDfh%23431@172.235.19.67:27017/bookstore?authSource=bookstore';
  try { 
        const client = await MongoClient.connect(uri);



    // database and collection code goes here
    const db = client.db("bookstore");
    const coll = db.collection("mybookstore_books");
    // find code goes here
    const data = await coll.find({}).toArray();
    // iterate code goes here

    await client.close();
          return{data};
	  //          ;
	  //
//	  console.log(data);

}catch(error){
        return{error: error.message};
}
}


exports.main = main;
