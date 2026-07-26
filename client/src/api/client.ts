import { handleApiError } from "@/api/errors";
import { ApiError } from "@/utils/types";
import type { ApiRequestOptions } from "@/utils/types";

const API_URL = "http://localhost:3000"; // ENV später

function buildUrl(path: string, query?: ApiRequestOptions["query"]) {
    const url = new URL(path, API_URL);
    if (query) {
        Object.entries(query).forEach(([k, v]) => {
            if (v !== undefined) url.searchParams.set(k, String(v));
        });
    }
    return url.toString();
}

export async function request(
    path: string,
    { method = "GET", body, query, errorMessage }: ApiRequestOptions
): Promise<T> {
    const res = await fetch(buildUrl(path, query), {
        method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: body ? JSON.stringify(body) : undefined
    });
    let json = null;

    try {
        json = await res.json();
    } catch {
        json = {};
    }

    if (!res.ok || json?.ok !== true) {
        const err = new ApiError(res.status, errorMessage ?? json);
        handleApiError(err);
        throw err;
    }

    return json;
}