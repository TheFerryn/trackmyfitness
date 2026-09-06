import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import {
  IconMan,
  IconWoman,
  IconPlus,
  IconMinus,
  IconArrowLeft,
  IconScaleOutline,
  IconArrowAutofitHeight,
  IconBarbellFilled,
  IconFlameFilled,
  IconTargetArrow,
} from "@tabler/icons-react";
import { GETTING_STARTED_STEPS } from "@/utils/types";
import type { GettingStartedData, GettingStartedStep } from "@/utils/types";
import { Button } from "@/components/ui/button";

function GenderSelect({ gender, setGender }) {
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
            value={gender}
            onValueChange={(value) => {
              setGender(value as GettingStartedData["gender"]);
            }}
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

function AgeSelect({ age, setAge }) {
  const currentAge = age || 18;
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return;
    const value = Number(e.target.value);

    if (value >= 18 && value <= 99) {
      setAge(value);
    }
  };
  const increaseAge = () => {
    setAge(Math.min(99, currentAge + 1));
  };
  const decreaseAge = () => {
    setAge(Math.max(18, currentAge - 1));
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="text-3xl font-semibold">
          📆 What's your age?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-xl">
          This would help us to personalize your experience in the future.
        </CardDescription>
        <div className="flex items-center justify-center gap-4">
          <Button variant="ghost" size="icon-lg" onClick={decreaseAge}>
            <IconMinus stroke={3} />
          </Button>
          <Input
            type="number"
            value={currentAge}
            min={18}
            max={99}
            className="w-16 h-12 text-center font-bold !text-2xl"
            onChange={handleAgeChange}
          />
          <span>years old</span>
          <Button variant="ghost" size="icon-lg" onClick={increaseAge}>
            <IconPlus stroke={3} />
          </Button>
        </div>
      </CardContent>
    </>
  );
}

function BodyInfoSelect({ height, setHeight, weight, setWeight }) {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-3xl font-semibold">
          Tell us more about your stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6 py-2">
          <div className="space-y-3">
            <span className="flex items-center gap-2 text-xl font-medium opacity-60">
              <IconArrowAutofitHeight />
              Your height
            </span>

            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={130}
                max={220}
                className="w-18 h-10 text-center !text-xl font-bold"
                placeholder="180"
              />
              <span className="text-xl">cm</span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-xl font-medium opacity-60">
              <IconScaleOutline />
              Current bodyweight
            </h2>

            <div className="flex items-center gap-2">
              <Input
                type="number"
                className="w-18 h-10 text-center !text-xl font-bold"
                placeholder="75"
              />
              <span className="text-xl">kg</span>
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
}

function GoalSelect({ goal, setGoal }) {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-3xl font-semibold">
          🎯 What is your goal?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full max-w-md">
          <FieldGroup>
            <FieldSet>
              <RadioGroup defaultValue="kubernetes">
                <FieldLabel className="bg-background" htmlFor="bulk">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>
                        <IconBarbellFilled stroke={3} />
                        <span className="!text-xl font-semibold">
                          Gain muscle mass
                        </span>
                      </FieldTitle>
                      <FieldDescription className="text-lg">
                        You want to get bigger, stronger and progress your
                        workouts
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem id="bulk" value="bulk" />
                  </Field>
                </FieldLabel>
                <FieldLabel className="bg-background" htmlFor="maintain">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>
                        <IconTargetArrow stroke={2} />
                        <span className="!text-xl font-semibold">
                          Maintain form
                        </span>
                      </FieldTitle>
                      <FieldDescription className="text-lg">
                        Keep your current bodyweight and strength
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem id="maintain" value="maintain" />
                  </Field>
                </FieldLabel>
                <FieldLabel className="bg-background" htmlFor="cut">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>
                        <IconFlameFilled stroke={3} />
                        <span className="!text-xl font-semibold">
                          Loose bodyfat
                        </span>
                      </FieldTitle>
                      <FieldDescription className="text-lg">
                        Get leaner by minimizing your bodyfat percentage
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem id="cut" value="cut" />
                  </Field>
                </FieldLabel>
              </RadioGroup>
            </FieldSet>
          </FieldGroup>
        </div>
      </CardContent>
    </>
  );
}

function GettingStartedContent({
  currentStep,
  data,
  updateData,
  nextStep,
}: {
  currentStep: GettingStartedStep;
  data: GettingStartedData;
  updateData: <K extends keyof GettingStartedData>(
    key: K,
    value: GettingStartedData[K],
  ) => void;
  nextStep: () => void;
}) {
  switch (currentStep) {
    case GETTING_STARTED_STEPS.GENDER:
      return (
        <GenderSelect
          gender={data.gender}
          setGender={(val) => {
            updateData("gender", val);
            nextStep();
          }}
        />
      );
      break;
    case GETTING_STARTED_STEPS.AGE:
      return (
        <AgeSelect
          age={data.age}
          setAge={(val) => {
            updateData("age", val);
          }}
        />
      );
      break;
    case GETTING_STARTED_STEPS.BODY_INFO:
      return (
        <BodyInfoSelect
          height={data.height}
          setHeight={(val) => {
            updateData("height", val);
          }}
          weight={data.bodyweight}
          setWeight={(val) => {
            updateData("bodyweight", val);
          }}
        />
      );
      break;
    case GETTING_STARTED_STEPS.GOAL:
      return (
        <GoalSelect
          goal={data.goal}
          setGoal={(val) => {
            updateData("goal", val);
          }}
        />
      );
      break;
  }
}

export function GettingStarted({
  className,
  ...props
}): React.ComponentProps<"div"> {
  const [currentStep, setCurrentStep] = useState<GettingStartedStep>(
    GETTING_STARTED_STEPS.GENDER,
  );
  const progress = (currentStep / GETTING_STARTED_STEPS.END) * 100;
  const [data, setData] = useState<GettingStartedData>({
    gender: null,
    age: null,
    height: null,
    bodyweight: null,
    goal: null,
    steps: null,
    experience: null,
  });
  const updateData = <K extends keyof GettingStartedData>(
    key: K,
    value: GettingStartedData[K],
  ) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const nextStep = () => {
    setCurrentStep(
      (prev) =>
        Math.min(prev + 1, GETTING_STARTED_STEPS.END) as GettingStartedStep,
    );
  };
  const prevStep = () => {
    setCurrentStep(
      (prev) =>
        Math.max(prev - 1, GETTING_STARTED_STEPS.GENDER) as GettingStartedStep,
    );
  };
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg">
        <Card>
          <div className="px-6">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-semibold text-muted-foreground">
                {currentStep} / {GETTING_STARTED_STEPS.END}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2 rounded-full" />
          </div>
          <GettingStartedContent
            currentStep={currentStep}
            data={data}
            updateData={updateData}
            nextStep={nextStep}
          />
          {currentStep > 1 && (
            <div className="flex items-center justify-between px-6">
              <Button variant="outline" onClick={prevStep}>
                <IconArrowLeft stroke={3} />
              </Button>
              <Button variant="default" onClick={nextStep}>
                Continue
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
