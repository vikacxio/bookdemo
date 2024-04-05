const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
//const uri =  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";
//const client = new MongoClient(uri);
async function main() {


const uri = 'mongodb://user1:WDfh%23431@172.235.19.67:27017/bookstore?authSource=bookstore';
  try { 
        const client = await MongoClient.connect(uri);



    // database and collection code goes here
    const db = client.db("bookstore");
    const coll = db.collection("mybookstore_cart");
    // find code goes here
    const data = await coll.find({}).toArray();
    // iterate code goes here

    await client.close();
          console.log(data)
	  //          ;
	  //
//	  console.log(data);

}catch(error){
        return{error: error.message};
}
}
main();






























































{
      "data": [
          {
              "_id": "65e926b9c9102fff5e4eae56",
              "books": "[{\"M\":{\"customerId\":{\"S\":\"us-east-1:03a4712f-3dae-c5fe-7306-655dd75858dc\"},\"quantity\":{\"N\":\"1\"},\"price\":{\"N\":\"18.99\"},\"bookId\":{\"S\":\"sif184ws-d93b-11e8-9f8b-f2801f1b9fd1\"}}}]",
              "customerId": "us-east-1:03a4712f-3dae-c5fe-7306-655dd75858dc",
              "orderDate": 1709036357741,
              "orderId": "31fcdb04-0774-438c-b9be-e3b5615c5319"
          },
          {
              "_id": "660ee60ee42eb6ca9812ea2e",
              "books": "[{\"_id\":\"65e926afff49fffff63884b3\",\"bookId\":\"6dyqsnj1-d93b-11e8-9f8b-f2801f1b9fd1\",\"price\":18.99,\"quantity\":1},{\"_id\":\"65e926afff49fffff63884b4\",\"bookId\":\"3sbvndpe-d93b-11e8-9f8b-f2801f1b9fd1\",\"price\":22.96,\"quantity\":1}]",
              "customerId": "bovyva@closetab.email",
              "orderDate": 1712252430223,
              "orderId": 55
          }
        
      ]
  }