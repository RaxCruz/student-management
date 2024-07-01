"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
export default function TimeCard() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString();
  const date = new Date("2024-07-01"); // Example: creating a Date object for July 1, 2024

  // Convert Gregorian year to ROC year
  const rocYear = date.getFullYear() - 1911;

  // Extract month and day, ensuring they are zero-padded
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed, so add 1
  const day = date.getDate().toString().padStart(2, "0");

  // Format ROC date string
  const taiwanDate = `${rocYear}/${month}/${day}`;
  return (
    <Card x-chunk="dashboard-02-chunk-0">
      <CardHeader className="p-0 pt-2 md:p-2">
        <CardTitle className="text-center">{taiwanDate}</CardTitle>
        <CardDescription className="text-center">當前時間</CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
        <Button size="sm" className="w-full" suppressHydrationWarning>
          {formattedTime}
        </Button>
      </CardContent>
    </Card>
  );
}
