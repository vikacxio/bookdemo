const { MongoClient } = require("mongodb");
async function main(args) {


    const uri = 'mongodb://user1:WDfh%23431@172.235.19.67:27017/bookstore?authSource=bookstore';
    try {
        const client = await MongoClient.connect(uri);

        var bId = "";



        const db = client.db("bookstore");
        const coll = db.collection("mybookstore_books");
        var cat = "";
        if (args.category) {
            cat = args.category.toString();
        }
        if (args.bookId) {
            bId = args.bookId.toString();
        }

        var query = "";
        if (bId != "") {
            query = { id: bId };
        } else {
            query = { category: cat }
        }


        const data = await coll.find(query).toArray();

        await client.close();
        return { data };

    } catch (error) {
        return { error: error.message };
    }
}


exports.main = main;
