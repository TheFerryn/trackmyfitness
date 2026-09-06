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

export const GETTING_STARTED_STEPS = {
    GENDER: 1,
    AGE: 2,
    BODY_INFO: 3,
    GOAL: 4,
    STEPS: 5,
    EXPERIENCE: 6,
    END: 7
} as const;

export type GettingStartedStep = (typeof GETTING_STARTED_STEPS)[keyof typeof GETTING_STARTED_STEPS];

export type GettingStartedData = {
    gender: "male" | "female" | "other" | null,
    age: number | null,
    height: number | null,
    bodyweight: number | null,
    goal: "cut" | "bulk" | "maintain" | null,
    steps: number | null,
    experience: "beginner" | "intermediate" | "advanced" | null
};