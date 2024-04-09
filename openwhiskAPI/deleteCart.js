const { MongoClient } = require("mongodb");

async function main(args) {


	const uri = 'mongodb://user1:WDfh%23431@172.235.19.67:27017/bookstore?authSource=bookstore';
	try {
		const client = await MongoClient.connect(uri);



		// database and collection code goes here
		const db = client.db("bookstore");
		const coll = db.collection("mybookstore_cart");
		var bId = "";

		if (args.bookId) {
			bId = args.bookId.toString();
		}
		const cId = args.customerId.toString();

		var query = "";
		if (bId != "") {

			query = { $and: [{ bookId: bId }, { customerId: cId }] };
		} else {
			query = { customerId: cId };
		}

		const data = await coll.deleteMany(query);
		// iterate code goes here
		await client.close();

		return { 'Deleted documents': data.deletedCount };



	} catch (error) {
		return { error: error.message };
	}
}

exports.main = main;
