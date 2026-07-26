export type ApiRequestOptions = {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    body?: Record<string, unknown>,
    query?: Record<string, string | number | undefined>,
    errorMessage?: string
}

export class ApiError extends Error {
    constructor(
        public status: number,
        message?: string | undefined
    ) {
        super(message);
        this.name = "ApiError";
    }
}

export const DASHBOARD_VIEWS = {
    OVERVIEW: "overview",
    BODYWEIGHT: "bodyweight",
    EXERCISES: "exercises",
    TRAINING: "training",
    SETTINGS: "settings"
} as const;


export type DashboardView = (typeof DASHBOARD_VIEWS)[keyof typeof DASHBOARD_VIEWS];