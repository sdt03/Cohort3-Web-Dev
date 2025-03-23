import { PrismaClient } from "@prisma/client";

const client = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "query"
        },
    ],
});

async function createUser() {
    await client.user.create({
    data: {
        username: "Shoumik2",
        password: "12345522",
        age: 21
    }
})
}

createUser();