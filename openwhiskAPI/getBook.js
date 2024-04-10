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




















{
    "getFriendsCustomerList": {
        "keys": [
            "a"
        ],
        "records": [
            {
                "_fieldLookup": {
                    "a": 0
                },
                "_fields": [
                    {
                        "elementId": "4:b1b12e01-32d6-47f7-98e0-b820f1588b64:2",
                        "identity": {
                            "high": 0,
                            "low": 2
                        },
                        "labels": [
                            "Customer"
                        ],
                        "properties": {
                            "customerId": "vikas@gmail.com"
                        }
                    }
                ],
                "keys": [
                    "a"
                ],
                "length": 1
            },
            {
                "_fieldLookup": {
                    "a": 0
                },
                "_fields": [
                    {
                        "elementId": "4:b1b12e01-32d6-47f7-98e0-b820f1588b64:3",
                        "identity": {
                            "high": 0,
                            "low": 3
                        },
                        "labels": [
                            "Customer"
                        ],
                        "properties": {
                            "customerId": "aman@gmail.com"
                        }
                    }
                ],
                "keys": [
                    "a"
                ],
                "length": 1
            }
        ],
        "summary": {
            "counters": {
                "_stats": {
                    "constraintsAdded": 0,
                    "constraintsRemoved": 0,
                    "indexesAdded": 0,
                    "indexesRemoved": 0,
                    "labelsAdded": 0,
                    "labelsRemoved": 0,
                    "nodesCreated": 0,
                    "nodesDeleted": 0,
                    "propertiesSet": 0,
                    "relationshipsCreated": 0,
                    "relationshipsDeleted": 0
                },
                "_systemUpdates": 0
            },
            "database": {
                "name": "neo4j"
            },
            "notifications": [],
            "plan": false,
            "profile": false,
            "query": {
                "parameters": {
                    "database": "neo4j"
                },
                "text": "MATCH (a:Customer)<-[:FRIEND]-(b:Customer where b.customerId=\"bovyva@closetab.email\") WITH (a) MATCH (a)-[p:PURCHASED]->(r:Book where r.bookId=\"65e926afff49fffff63884b4\") return DISTINCT(a)"
            },
            "queryType": "r",
            "resultAvailableAfter": {
                "high": 0,
                "low": 2
            },
            "resultConsumedAfter": {
                "high": 0,
                "low": 9
            },
            "server": {
                "address": "172.105.34.170:7687",
                "agent": "Neo4j/5.17.0",
                "protocolVersion": 5.4
            },
            "updateStatistics": {
                "_stats": {
                    "constraintsAdded": 0,
                    "constraintsRemoved": 0,
                    "indexesAdded": 0,
                    "indexesRemoved": 0,
                    "labelsAdded": 0,
                    "labelsRemoved": 0,
                    "nodesCreated": 0,
                    "nodesDeleted": 0,
                    "propertiesSet": 0,
                    "relationshipsCreated": 0,
                    "relationshipsDeleted": 0
                },
                "_systemUpdates": 0
            }
        }
    }
}