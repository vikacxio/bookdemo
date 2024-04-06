const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
//const uri =  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";
//const client = new MongoClient(uri);
async function main(cId) {


const uri = 'mongodb://user1:WDfh%23431@172.235.19.67:27017/bookstore?authSource=bookstore';
  try { 
        const client = await MongoClient.connect(uri);



    // database and collection code goes here
    const db = client.db("bookstore");
    const coll = db.collection("mybookstore_orders");
		  query = {customerId: cId};

//	  const query = {customerId : cId}
    // find code goes here
//	  console.log(cId);
    const data = await coll.deleteMany(query);
    // iterate code goes here
	
        console.log('Deleted documents'+ data.deletedCount);
    await client.close();
          
	  //          ;
	  //
//	  console.log(data);

}catch(error)
{
	console.log(error);
       // return{error: error.message};
}
}
main("us-east-1:03a4712f-3dae-c5fe-7306-655dd75858dc");
exports.main = main;
