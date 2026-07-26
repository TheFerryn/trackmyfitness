import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { authApi } from "@/api/modules/auth";
import { ApiError } from "@/utils/types"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field.tsx"
import { Input } from "@/components/ui/input.tsx"

export function Login ({ className, ...props }): React.ComponentProps<"div"> {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const login = (async () => {
        await authApi.requestCode(email);
        navigate("/otp", { state: email });
    });
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Welcome to TrackMyFitness</CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="abc@example.com"
                                            onChange={(e: string) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Field>
                                    <Field>
                                        <Button
                                            type="button"
                                            disabled={!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))}
                                            onClick={() => login()}
                                        >
                                            Login
                                        </Button>
                                    </Field>
                                </FieldGroup>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}