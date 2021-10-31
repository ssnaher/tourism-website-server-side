const express = require('express');
const { MongoClient } = require('mongodb');
const objectId = require('mongodb').objectId;
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
// user: toursimSite
// pass: z0FhMUl48PQAiAsl


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nigwe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('tourismSite');
        const packagesCollection = database.collection('packages');
        //Get API
        app.get('/packages', async (req, res) => {
            const cursor = packagesCollection.find({});
            const packages = await cursor.toArray();
            res.send(packages);
        })

        //Get single packages
        app.get('/packages/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId };
            const package = await packagesCollection.findOne(query);
            res.json(package);
        })

        // Post API
        app.post('/packages', async (req, res) => {
            const package = req.body;
            console.log('hit the post api', package);



            const result = await packagesCollection.insertOne(package);
            console.log(result);
            res.json(result);

        })

        //Delete API
        app.delete('/packages/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await packagesCollection.deleteOne(query);
            res.json(result);
        })

    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('running tourism site');
});

app.listen(port, () => {
    console.log('lets go to picnic', port);
})
