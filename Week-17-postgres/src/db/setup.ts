import { client } from "..";

export async function createTable() {
    const Tables = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(20) UNIQUE NOT NULL,
            password VARCHAR(20) NOT NULL,
            name VARCHAR(100) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS travelplans(
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id),
            title VARCHAR(50) NOT NULL,
            destination_city VARCHAR(50) NOT NULL,
            destination_country VARCHAR(50) NOT NULL,
            budget NUMERIC
        );
    `;

    await client.query(Tables);
    console.log("Tables table created successfully!");
}

