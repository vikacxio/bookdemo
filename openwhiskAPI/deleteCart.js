const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
//const uri =  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";
//const client = new MongoClient(uri);
async function main(args) {


const uri = 'mongodb://user1:WDfh%23431@172.235.19.67:27017/bookstore?authSource=bookstore';
  try { 
        const client = await MongoClient.connect(uri);



    // database and collection code goes here
    const db = client.db("bookstore");
    const coll = db.collection("mybookstore_cart");
          var bId="";

//	  console.log(Id);
	  if(args.bookId){
	  bId = args.bookId.toString();
	  }
	  const cId = args.customerId.toString();
//	  const d = bId + 123 + cId;
//	  return {"Hi": d}
	  var query="";
	  if(bId!=""){

	query ={ $and: [{bookId: bId}, {customerId: cId}]};
	 }else{
		  query = {customerId: cId};
	 }

//	  const query = {customerId : cId}
    // find code goes here
//	  console.log(cId);
    const data = await coll.deleteMany(query);
    // iterate code goes here
	
        return{'Deleted documents': data.deletedCount};
    await client.close();
          
	  //          ;
	  //
//	  console.log(data);

}catch(error)
{
	//console.log(error);
        return{error: error.message};
}
}

exports.main = main;
