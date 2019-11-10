const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb://localhost:27017`;

const client = new MongoClient(uri, { useNewUrlParser: true });

// TODO: Test connection to mongodb 
// MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
//     if (err) console.log(err);
//     else console.log('mongodb connected...');
// });

module.exports = client;