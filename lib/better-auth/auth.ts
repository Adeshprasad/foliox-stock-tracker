
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectToDatabase } from "@/database/mongoose";
import { nextCookies } from "better-auth/next-js";

// Create the auth instance
const createAuth = async () => {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) {
        throw new Error("MongoDB connection not found");
    }

    return betterAuth({
        database: mongodbAdapter(db),
        secret: process.env.BETTER_AUTH_SECRET,
        baseURL: process.env.BETTER_AUTH_URL,

        emailAndPassword: {
            enabled: true,
            disableSignUp: false,
            requireEmailVerification: false,
            minPasswordLength: 8,
            maxPasswordLength: 128,
            autoSignIn: true,
        },

        plugins: [nextCookies()],
    });
};

// Infer the actual Better Auth instance type
type AuthInstance = Awaited<ReturnType<typeof createAuth>>;

let authInstance: AuthInstance | null = null;

export const getAuth = async (): Promise<AuthInstance> => {
    if (authInstance) return authInstance;

    authInstance = await createAuth();

    return authInstance;
};
