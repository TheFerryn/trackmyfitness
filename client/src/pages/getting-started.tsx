import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Progress } from "@/components/ui/progress";
import { IconMan, IconWoman } from "@tabler/icons-react";

function GenderSelect() {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          Ready to start? Let us know more about you...
        </CardTitle>
        <CardDescription className="text-xl">
          Whats your biological gender?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <ToggleGroup
            className="flex w-full"
            size="lg"
            variant="outline"
            type="single"
          >
            <ToggleGroupItem className="flex-1" value="male">
              <IconMan />
              <span className="font-semibold">Men</span>
            </ToggleGroupItem>
            <ToggleGroupItem className="flex-1" value="female">
              <IconWoman />
              <span className="font-semibold">Women</span>
            </ToggleGroupItem>
            <ToggleGroupItem className="flex-1" value="other">
              <span className="font-semibold">Other</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardContent>
    </>
  );
}
export function GettingStarted({
  className,
  ...props
}): React.ComponentProps<"div"> {
  const [step, setStep] = useState(1);
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg">
        <Card>
          <div className="px-6">
            <Progress value={10} className="h-2 rounded-full" />
          </div>
          <GenderSelect />
        </Card>
      </div>
    </div>
  );
}
