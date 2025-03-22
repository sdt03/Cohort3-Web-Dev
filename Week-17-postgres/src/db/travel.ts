import { client } from "..";

export async function createTravelPlans(
    userId: number,
    title: string,
    destinationCity: string,
    destinationCountry: string,
    budget?: number
) {
    const query = `
        INSERT INTO travelplans (user_id, title, destination_city, destination_country, budget)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [userId, title, destinationCity, destinationCountry, budget];
    const result = await client.query(query, values);
    return result.rows[0]; 
}

export async function getTravelPlans(
    userId: number
) {
    const query = `
        SELECT * FROM travelplans WHERE user_id = $1;
    `;

    const values = [userId];
    const result = await client.query(query, values);
    return result.rows;
}