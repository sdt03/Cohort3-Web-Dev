import { client } from ".."

export async function createUser(
    username: string,
    password: string,
    name: string
) {
    const query = `
        INSERT INTO users (username, password, name)
        values ($1, $2, $3)
        RETURNING id username, name;
    `
    const values = [username, password, name];
    const result = await client.query(query, values);
    return result.rows[0];
}