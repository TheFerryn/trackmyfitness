import { request } from "../client";

export const bodyweightApi = {
    getEntries: ((day?: string)=> request("/bodyweight/entries", { query: { day } })),
    createEntry: ((value: number, day: string)=> {
        return request("/bodyweight/create-entry", {
            method: "PATCH",
            body: { value, day },
            errorMessage: "Failed to create a bodyweight entry"
        });
    })
}