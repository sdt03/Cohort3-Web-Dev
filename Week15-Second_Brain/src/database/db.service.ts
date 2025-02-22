import * as mongoDB from 'mongodb';
import {dbURI} from '../config';

export async function connectDB(){
    try{
        const client = new mongoDB.MongoClient(dbURI);
        await client.connect();
    } catch(error){
        console.error(error);
    }
}

export default connectDB;