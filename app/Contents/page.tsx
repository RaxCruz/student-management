"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function Contents() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 h-screen">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">學生資訊系統</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            歡迎使用學生管理資訊系統
          </h3>
          <p className="text-sm text-muted-foreground">
            透過左側查詢，或下方建立新學生資料
          </p>
          <Link href="user/create">
            <Button className="mt-4">新增學生資料</Button>
          </Link>

        </div>
      </div>
    </main>
  );
}
