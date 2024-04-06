const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
//const uri =  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";
//const client = new MongoClient(uri);



const uri = 'mongodb://user1:WDfh%23431@172.235.19.67:27017/bookstore?authSource=bookstore';

const args ={customerId: "bovyva@closetab.email",
	books:  {
            "_id": "65e926afff49fffff63884b3",
            "author": "Brady Fisher",
            "category": "Database",
            "cover": "https://d3us92vnpsmg1c.cloudfront.net/book-covers/In-memory.png",
            "id": "6dyqsnj1-d93b-11e8-9f8b-f2801f1b9fd1",
            "name": "In-memory",
            "price": 18.99,
            "rating": 5
        }
}





const dbName = "bookstore"

// Collection Name for orders
const orderCollectionName = 'mybookstore_orders';

async function getNextOrderId(client) {
    const db = client.db(dbName);
    const result = await db.collection('order_sequence').findOneAndUpdate(
        { _id: 'order_id' },
        { $inc: { seq: 1 } },
        { returnOriginal: false, upsert: true }
    );

	if (!result || !result.value) {
        // If document doesn't exist, initialize sequence number to 1
        return 1;
    }
    return result.value.seq;
}

// Function to insert an order with auto-generated orderId and auto-generated _id
async function insertOrder(client, cId, book ,dt) {
    const orderId = await getNextOrderId(client);

    const collection = client.db(dbName).collection(orderCollectionName);
    await collection.insertOne({customerId: cId}, {orderId: orderId}, {books: book}, {orderDate: dt});

    console.log(`Order inserted with _id:  and orderId: ${orderId}`);
}




async function deleteCart(client,cId, book)
{
	const jsonString = JSON.stringify(book);

	const books = JSON.parse(jsonString);
	const booksArray = Object.values(books);
	
		const db= client.db(dbName);
		
		const coll =  db.collection("mybookstore_cart");

	booksArray.forEach(async function(item){
	//	customerId = cId;
	//	bookId= item.bookId;

			
		var bId="";

//	  console.log(Id);
	  if(item.bookId){
	  bId = item.bookId;
	  }
	 // const cId = args.customerId.toString();
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



	})


}





async function main(args) {


        const client = await MongoClient.connect(uri);
  try { 



    // database and collection code goes here
	  //
	var cId = args.customerId.toString()
	var book = args.books;
	var dt = Date.now();
	
  await insertOrder(client, cId, book, dt);
await deleteCart(client, cId, book);



    




    // iterate code goes here

    	 console.log("Data" + "Order Inserted");
          //return{data};
	  //          ;
	  //
//	  console.log(data);

}catch(error){
	console.log(error);
      //  return{error: error.message};

}finally{
await client.close();

}}
main(args);
exports.main = main;
//main();
