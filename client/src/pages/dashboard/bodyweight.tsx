import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardHeader,
  CardDescription,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup } from "@/components/ui/field";
import { IconEdit } from "@tabler/icons-react";
import { toast } from "sonner";
import { bodyweightApi } from "@/api/modules/bodyweight";

export function BodyweightEntry() {
  const minBodyweight = 40;
  const maxBodyweight = 140;
  const [date, setDate] = useState<Date>(new Date());
  const [bodyweight, setBodyweight] = useState<number>(minBodyweight);

  const createEntry = async () => {
    await bodyweightApi.createEntry(
      bodyweight,
      date.toLocaleDateString("en-CA"),
    );
    toast.success("Bodyweight entry successfully created!");
  };

  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="secondary" size="lg">
              <IconEdit />
              Enter bodyweight
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Create new entry</DialogTitle>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d: Date) => setDate(d)}
                  disabled={(d: Date) => d > new Date()}
                  className="rounded-lg border scale-95"
                  captionLayout="dropdown"
                />
              </Field>
              <Field>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Bodyweight (kg)</Label>
                    <Input
                      type="number"
                      inputMode="decimal"
                      min={minBodyweight}
                      max={maxBodyweight}
                      step={0.1}
                      value={bodyweight}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        if (!isNaN(v)) {
                          setBodyweight(
                            Math.min(minBodyweight, Math.max(maxBodyweight, v)),
                          );
                        }
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Slider
                      value={[bodyweight]}
                      min={minBodyweight}
                      max={maxBodyweight}
                      step={0.1}
                      onValueChange={(v) => setBodyweight(v[0])}
                    />
                  </div>
                </div>
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  type="submit"
                  disabled={date === undefined || bodyweight === undefined}
                  onClick={() => createEntry()}
                >
                  Submit
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

function BodyweightChart() {
  const [chartData, setChartData] = useState<
    [{ date: string; bodyweight: number }]
  >([]);

  useEffect(() => {
    (async () => {
      const entries = await bodyweightApi.getEntries();
      const data = entries.data
        .slice()
        .sort((a, b) => a.day.localeCompare(b.day))
        .map(({ day, value }) => ({ date: day, bodyweight: value }));

      setChartData(data);
    })();
  }, []);
  const chartConfig = {
    bodyweight: {
      label: "Bodyweight",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Bodyweight Chart</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart
            data={chartData}
            margin={{ top: 12, right: 6, left: 6, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillBodyweight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F6FD9" stopOpacity={0.16} />
                <stop offset="100%" stopColor="#4F6FD9" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeOpacity={0.3} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("de-DE", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis hide domain={["dataMin - 0.8", "dataMax + 0.8 "]} />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("de-DE", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="bodyweight"
              type="natural"
              stroke="#4F6FD9"
              fill="url(#fillBodyweight)"
              dot={false}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function Bodyweight() {
  const [currentBodyweight, setCurrentBodyweight] = useState<number | null>(
    null,
  );
  useEffect(() => {
    (async () => {
      const entries = await bodyweightApi.getEntries();
      setCurrentBodyweight(entries.data[0].value);
    })();
  }, []);
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
            <Card className="@container/card">
              <CardHeader>
                <CardDescription>Your current bodyweight</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {currentBodyweight ? `${currentBodyweight}kg` : "--"}
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex flex-col items-start gap-4">
                <div className="text-muted-foreground">
                  You can add more data by clicking the button below
                </div>
                <BodyweightEntry />
              </CardFooter>
            </Card>
            <Card className="@container/card">
              <CardHeader>
                <CardDescription>Your calorie day maintenance</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  2,293kcal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <div className="space-y-5">
                    <Progress value={40} className="w-[60%]" />
                    <Progress value={50} className="w-[60%]" />
                    <Progress value={10} className="w-[60%]" />
                  </div>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          <div className="px-4 lg:px-6">
            <BodyweightChart />
          </div>
        </div>
      </div>
    </div>
  );
}
