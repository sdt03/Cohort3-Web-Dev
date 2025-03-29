import { compare } from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './prismdb';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'signin',
            credentials: {
                username: {label: "Username", type: "text", placeholder:"Enter your username"},
                password: {label: "Password", type: "password", placeholder: 'Password'}
            },
            async authorize(credentials, req) {
                if(!credentials?.username || !credentials?.password){
                    throw new Error("galat");
                }

                const user = await prisma.user.findFirst({
                    where: {
                        username: credentials.username
                    }
                });

                if(user){
                    const passwordMatch = await compare(credentials.password, user.password);
                    if(passwordMatch){
                        return {
                            id: user.id.toString(),
                            username: user.username 
                        }   
                    }    
                } 

                return null;
            },
        })
    ],
    callbacks: {
        session: {
            strategy: "jwt"
        }
    }
}