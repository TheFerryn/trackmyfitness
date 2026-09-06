import { toast } from "sonner"
import { ApiError } from "@/utils/types"

export function handleApiError(err: unknown) {
    if (!(err instanceof ApiError)) {
        console.error(err);
        toast.error("Oops.. unexpected error! Try again later");
        return;
    }

    if (err?.message) {
        return toast.error(err.message);
    }

    let message: string = "Something went wrong... please try again!";

    switch (err.status) {
        case 401:
            message = "Session expired. Please login again."
            break;
        case 403:
            message = "You aren't allowed to do this."
            break;
        case 429:
            message = "Slowdown! You should wait a bit before trying again"
            break;
        case 400:
        case 422:
            message = "Your input is invalid. Try again."
            break;
        default:
            if (err.status >= 500) {
                message = "Internal server error. Please try again later!"
            }
    }

    toast.error(message);
}