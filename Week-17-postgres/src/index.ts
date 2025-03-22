import { Client } from "pg";
import { DB_URL } from "./config";
import express from "express";
import { createTable } from "./db/setup";
import { createUser } from "./db/user";
import { createTravelPlans, getTravelPlans } from "./db/travel";

const app = express();
app.use(express.json());

export const client = new Client({
    connectionString: DB_URL
});

client.connect().then(async () => {
    await createTable();
}).catch(
    err => console.error("Error connecting to DB", err)
);

app.post("/get-plans", async (req, res)=> {
    const userId = req.body.userId;

    try {
        const getPlans = await getTravelPlans(userId);
        res.json({getPlans});
    } catch (error) {
        console.error("Error: ", error);
        res.json({message: "Error"});  
    }
});

app.post("/signup", async(req, res)=>{
    const { username, password, name } = req.body;

    try{
        const user = await createUser(username, password, name);
        res.status(201).json({message: "User created!"});
    } catch (error){
        console.error("Error: ", error);
        res.status(500).json({message: "error creating user"});
    } 
});

app.post("/travel", async(req, res)=> {
    const { userId, title, destinationCity, destinationCountry, budget } = req.body;

    try {
        const travelPlans = await createTravelPlans(userId, title, destinationCity, destinationCountry, budget);
        res.status(201).json({ message: "Travel plans created!", travelPlans });
    } catch (error) {
        console.error("Error while inserting travel plans", error);
        res.status(500).json({ message: "Error" });
    }
})

app.listen(3000);

