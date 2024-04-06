const { MongoClient } = require("mongodb");
async function main(args) {


const uri = 'mongodb://user1:WDfh%23431@172.235.19.67:27017/bookstore?authSource=bookstore';
  try { 
        const client = await MongoClient.connect(uri);

	var cId = args.customerId.toString()
	var bId = args.bookId.toString();
	var p = parseFloat(args.price);
	var q = parseInt(args.quantity);
    const db = client.db("bookstore");
    const coll = db.collection("mybookstore_cart");
    

	  var d = cId+ bId+ p + q;

    const data = await coll.insertOne({customerId: cId , bookId : bId ,price: p, quantity:q}) ;


    await client.close();
	 return {"data" : data.insertedId};
 
}catch(error){
	console.log(error);
   
}
}

exports.main = main;

