"use server";

import { cookies } from "next/headers";

import { account, createSessionClient } from "../appwrite.config";
import { redirect } from "next/navigation";

export const signInUser = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(
            email,
            password
        );

        cookies().set("session_token", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
          });
        return session;
    } catch (error) {
        console.error("An error occurred while logging in:", error);
    }
};

export const getCurrentDoctor = async () => {
    try {
        const user = await getLoggedInUser();
        return user;
    } catch (error) {
        console.error("An error occurred while logging in:", error);
    }
};

export const logoutCurrentDoctor = async () => {
    try {
        // const session = cookies().get("session_token");
        // console.log('session logout', session);
        
        // await account.deleteSession("current");

        const { account } = await createSessionClient();

        cookies().delete("session_token");
        await account.deleteSession("current");
    } catch (error) {
        console.error("An error occurred while logging out:", error);
    }
};
