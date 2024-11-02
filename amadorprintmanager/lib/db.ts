
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
if(!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
}
const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})
client.connect()
let db = client.db("amadorprintmanager")
export  default db;