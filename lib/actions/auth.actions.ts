"use server";
import { account } from "../appwrite.config";

export const signInUser = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(
            email,
            password
        );
        return session;
    } catch (error) {
        console.error("An error occurred while logging in:", error);
    }
};

export const getCurrentDoctor = async () => {
    try {
        const session = await account.get();
        return session;
    } catch (error) {
        console.error("An error occurred while logging in:", error);
    }
};

export const logoutCurrentDoctor = async () => {
    try {
        await account.deleteSession("current");
    } catch (error) {
        console.error("An error occurred while logging out:", error);
    }
};
