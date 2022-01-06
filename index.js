const express = require("express");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const { MongoClient } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vsocy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function run() {
    try {
        await client.connect();
        console.log("database connected succesfully");

        const database = client.db("saveoNursing");
        const doctors = database.collection("doctors");
        const services = database.collection("service");
        const orders = database.collection("orders");

        // GET API FOR DOCTORS
        app.get('/doctors', async(req, res)=>{
            const cursor = doctors.find({})
            const doctor = await cursor.toArray();
            res.send(doctor)
        });

        // GET API FOR SERVICE
        app.get('/service', async(req, res)=>{
            const cursor = services.find({})
            const doctor = await cursor.toArray();
            res.send(doctor)
        });
    }

    finally {
    }
}

run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("hello from Saveo Nursing room");
});

app.listen(port, () => {
    console.log("listening to port", port);
});
