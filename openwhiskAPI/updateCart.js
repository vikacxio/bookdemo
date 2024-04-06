const { MongoClient } = require("mongodb");

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
	  var q = parseInt(args.quantity);

	  const updateOperation = { $set: { quantity: q } }; 
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
    const data = await coll.updateOne(query,updateOperation);
   
	
        return{'Updated documents': data.modifiedCount};
    await client.close();
          

//	  console.log(data);

}catch(error)
{
	console.log(error);
        return{error: error.message};
}
}

exports.main = main;

