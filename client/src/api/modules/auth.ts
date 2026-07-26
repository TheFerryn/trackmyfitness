import { request } from "@/api/client";

export const authApi = {
    requestCode: ((email: string) => request("/auth/request-code", {
        method: "POST",
        body: { email },
        errorMessage: "Requesting code gone wrong... please try again!"
    })),
    login: ((email: string, code: string)=> request("/auth/login", {
        method: "POST",
        body: { email, code },
        errorMessage: "Failed to log in! Invalid code provided"
    }))
}