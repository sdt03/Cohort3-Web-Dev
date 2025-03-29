import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";


const handler = NextAuth({
    providers: [
        //@ts-ignore
        CredentialsProvider({
            name: "Login with email",
            credentials: {
                username: {label: "Username", type: "text", placeholder: "shoumik@gmail.com"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                const username =  credentials?.username;
                const password = credentials?.password;

                console.log(password);
                console.log(username);

                const user = {
                    name: "shoumik",
                    id: '1',
                    username: "shoumik@gmail.com"
                }
                if(user){
                    return user;
                } else {
                    return null;
                }
            },
        })
    ],
});

export {handler as GET, handler as POST};