const { MongoClient } = require("mongodb");

const sequenceCollectionName = 'order_sequence';
async function main() {


const uri = 'mongodb://user1:WDfh%23431@172.235.19.67:27017/bookstore?authSource=bookstore';
  try { 
        const client = await MongoClient.connect(uri);



    const db = client.db("bookstore");
  


 await db.createCollection(sequenceCollectionName);

        // Ensure the sequence collection has a unique index on _id field
        await db.collection(sequenceCollectionName).createIndex({ _id: 1 }, { name:" _id_1" });

        // Insert a document for order_id sequence if it doesn't exist
        const result = await db.collection(sequenceCollectionName).updateOne(
            { _id: 'order_id' },
            { $setOnInsert: { seq: 0 } },
            { upsert: true }
        );

        if (result.upsertedCount === 1) {
            console.log('Sequence document for order_id created.');
        } else {
            console.log('Sequence document for order_id already exists.');
        }

	  await client.close();
    } catch(error){
	    console.log(error);
    
        
    }
}

main()





