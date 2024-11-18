import { MongoClient, ServerApiVersion } from 'mongodb';

// const uri = process.env.MONGO_URL;
// const options = {};

// if (!uri) throw new Error('Please add your Mongo URI');

// const client: MongoClient = new MongoClient(uri, options);
// const clientPromise: MongoClient = await client.connect();

// // if (!global._mongoClientPromise) {
// //   global._mongoClientPromise = client.connect();
// // }

// // clientPromise = global._mongoClientPromise;

// export default clientPromise;

const uri = process.env.MONGO_URL || '';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'FIND',
      await client.db('iso-4217').collection('isoCountries').find({}).toArray(),
    );

    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

export default client;
