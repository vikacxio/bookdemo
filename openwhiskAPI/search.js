const fetch = require('node-fetch');
const url ="http://194.195.114.212:9200/mybookstore_books_1"
async function main(args) {
  try {
   
	  var que = args.q.toString();
    const query = {
      size: 25,
      query: {
        multi_match: {
          query: que,
          fields: ["name", "author", "category"]
        }
      }
    };
console.log(query)
    // Make the HTTP request with basic authenticationi
	 
	  const response = 	await fetch('http://194.195.114.212:9200/mybookstore_books_1/_search', {
    method: 'POST',
    body: JSON.stringify(query ),
    headers: {  'Content-Type': 'application/json','Authorization': 'Basic ' + btoa('elastic:elastic') }
   })
//	const data =await response.json();

  

    const responseData = await response.json();
//	console.log(responseData);
    // Create the response object with CORS headers
    const responseObject = {
      statusCode: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: responseData
    };
	  console.log(responseObject);
	return responseObject;
//   console.log( responseObject);
  } catch (error) {
    // Handle any errors
    console.error('Error:', error);
	 // return{error, error.message}
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
}


//args={
//	q:"Graph"
//}
//main(args);

exports.main = main;
