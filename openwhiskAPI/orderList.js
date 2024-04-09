const { MongoClient } = require("mongodb");

async function main() {


        const uri = 'mongodb://user1:WDfh%23431@172.235.19.67:27017/bookstore?authSource=bookstore';
        try {
                const client = await MongoClient.connect(uri);



                const db = client.db("bookstore");
                const coll = db.collection("mybookstore_orders");
                const cId = args.cId.toString();

                const data = await coll.find({}).toArray();

                await client.close();
                const jsonData = JSON.stringify(data);
                return { jsonData };


        } catch (error) {
                return { error: error.message };
        }
}


exports.main = main;
