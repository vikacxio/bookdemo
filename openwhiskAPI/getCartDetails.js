const { MongoClient } = require("mongodb");

async function main(args) {


const uri = 'mongodb://user1:WDfh%23431@172.235.19.67:27017/bookstore?authSource=bookstore';
  try { 
        const client = await MongoClient.connect(uri);



    // database and collection code goes here
    const db = client.db("bookstore");
	  var bId="";

//	  console.log(Id);
    const coll = db.collection("mybookstore_cart");
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
	//  return {"hi" : query};

//	  console.log(query);
    // find code goes here
    const data = await coll.find(query).toArray();
    // iterate code goes here
  //  console.log(data);
//
	  return {data}
    await client.close();
  //  return{data};
	  //;
	  //
//	  console.log(data);

}catch(error){
	console.log(error);
       // return{error: error.message};
}
}
//main(11)

exports.main = main


