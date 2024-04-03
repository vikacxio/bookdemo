const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
//const uri =  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";
//const client = new MongoClient(uri);
async function main(args) {


const uri = 'mongodb://user1:WDfh%23431@172.235.19.67:27017/bookstore?authSource=bookstore';
  try { 
        const client = await MongoClient.connect(uri);



    // database and collection code goes here
	  //
	var cId = args.customerId.toString()
	var bId = args.bookId.toString();
	var p = parseFloat(args.price);
	var q = parseInt(args.quantity);
    const db = client.db("bookstore");
    const coll = db.collection("mybookstore_cart");
    

	  var d = cId+ bId+ p + q;
//	  return{result:d};
	  // find code goes here
    const data = await coll.insertOne({customerId: cId , bookId : bId ,price: p, quantity:q}) ;

	 // console.log('Inserted document with id:', data.insertedId);


    // iterate code goes here

    await client.close();
	 return {"data" : data.insertedId};
          //return{data};
	  //          ;
	  //
//	  console.log(data);

}catch(error){
	console.log(error);
      //  return{error: error.message};
}
}

exports.main = main;
//main();
