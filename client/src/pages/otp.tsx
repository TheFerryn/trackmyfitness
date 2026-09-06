import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { authApi } from "@/api/modules/auth";
import { ApiError } from "@/utils/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCountdown } from "@/hooks/use-countdown";

export function OTP({ className, ...props }): React.ComponentProps<"div"> {
  const [input, setInput] = useState("");
  const [intervalValue, setIntervalValue] = useState<number>(1000);
  const location = useLocation();
  const navigate = useNavigate();
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 60,
    intervalMs: intervalValue,
  });

  const email = location.state as string | null;

  useEffect(() => {
    if (!email) {
      return navigate("/login");
    }
    startCountdown();
  }, [email, navigate, startCountdown]);

  const verifyOtp = async () => {
    await authApi.login(email as string, input);
    navigate("/dashboard");
  };

  const sendAgain = async () => {
    resetCountdown();
    startCountdown();
    try {
      await authApi.requestCode(email as string);
      toast.success("We've just sent an another code!");
    } catch {
      toast.error("We couldn't request a new code, please try again");
    }
  };

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <form onSubmit={(e) => e.preventDefault()}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-x1 font-bold">
                  Enter your verification code
                </h1>
                <FieldDescription>
                  We've sent a 6-digit-code to your email address
                </FieldDescription>
              </div>
              <Field>
                <FieldLabel htmlFor="otp" className="sr-only">
                  Verification code
                </FieldLabel>
                <InputOTP
                  minLength="6"
                  maxLength="6"
                  pattern="^\d+$"
                  value={input}
                  onChange={(input) => setInput(input)}
                  id="otp"
                  containerClassName="gap-4"
                  required
                >
                  <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <FieldDescription className="text-center">
                  The code expires in 5 minutes
                </FieldDescription>
              </Field>
              <Field>
                <Button
                  type="button"
                  disabled={!(input.length === 6)}
                  onClick={() => verifyOtp()}
                >
                  Verify
                </Button>
              </Field>
              <Field>
                <Button
                  type="button"
                  variant="outline"
                  disabled={count !== 0}
                  onClick={() => sendAgain()}
                >
                  Resend code {count === 0 ? "" : `in ${count}s`}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </div>
    </div>
  );
}
