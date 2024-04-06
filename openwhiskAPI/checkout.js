const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
//const uri =  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";
//const client = new MongoClient(uri);



const uri = 'mongodb://user1:WDfh%23431@172.235.19.67:27017/bookstore?authSource=bookstore';



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
	var jsonresult = JSON.stringify(result)
	var parseresult = JSON.parse(jsonresult)
	if (!jsonresult) {
        // If document doesn't exist, initialize sequence number to 1
        return 1;
    
	}
    return parseresult.seq;


}

// Function to insert an order with auto-generated orderId and auto-generated _id
async function insertOrder(client, cId, book ,dt) {
 //	const jsonString = JSON.stringify(book);

//	const books = JSON.parse(jsonString);
//	const booksArray = Object.values(books);
   const orderId = await getNextOrderId(client);

    const collection = client.db(dbName).collection(orderCollectionName);

    await collection.insertOne({customerId: cId, orderId: orderId, books: book, orderDate: dt});

  //  return {"Order inserted" : orderId}
}




async function deleteCart(client,cId, book)
{
	const jsonString = JSON.stringify(book);

	const books = JSON.parse(jsonString);
//	const booksArray = Object.values(books);
	
		const db= client.db(dbName);
		
		const coll =  db.collection("mybookstore_cart");

const deletePromises = books.map(async (item) => {
        var bId = "";
        if (item.bookId) {
            bId = item.bookId;
        }

        var query = "";
        if (bId !== "") {
            
	query ={ $and: [{bookId: bId}, {customerId: cId}]};
	 }else{
		  query = {customerId: cId};
	 }

        return coll.deleteMany(query);
    });

    await Promise.all(deletePromises);
  //  return {"Deleted Data" :"Deleted all relevant documents from the cart"};

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

    	 return {"Data" : "Order Inserted"};

}catch(error){
	return {"error": error};

}finally{
await client.close();

}}

exports.main = main;

