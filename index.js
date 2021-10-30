const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = 5000;
// user: toursimSite
// pass: z0FhMUl48PQAiAsl


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nigwe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        const database = client.db('tourismSite');
        const packagesCollection = database.collection('packages');

        // Post API
        app.post('/packages', async(req, res) =>{

            const package ={
                "name": "Visit Sylhet",
                "place": "Sylhet",
                "price": "10,000"
            }

            const result = await packagesCollection.insertOne(package);
            console.log(result);

        })
        
    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) =>{
    res.send('running tourism site');
});

app.listen(port, () =>{
    console.log('lets go to picnic', port);
})
