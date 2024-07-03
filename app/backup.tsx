"use client";

import Link from "next/link";
import {
    Bell,
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package,
    Package2,
    Search,
    ShoppingCart,
    Users,
    Upload,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PrismaClient } from '@prisma/client'
import { useRouter } from "next/navigation";
import JSConfetti from 'js-confetti'
import onScoreUpdate from "@/app/action/score_update";

const jsConfetti = new JSConfetti()


const prisma = new PrismaClient()

export default function ScoreCard({ scoreData, id }: { scoreData: any, id: any }) {
    const router = useRouter()
    const formSchema = z.object({
        student_id: z.string(),
        school_year: z.number().min(1, {
            message: "學生編號須為四位數字",
        }),
        semester: z.number().min(1, {
            message: "姓名至少2個字",
        }),
        chinese_score: z.number().min(0, {
            message: "身分證為10碼",
        }),
        math_score: z.number().min(0, {
            message: "至少提供一支電話, 中間使用-分隔",
        }),
        english_score: z.number().min(0, {
            message: "",
        }),
    })
    const defaultValues = scoreData ? scoreData : {
        student_id: "",
        school_year: "",
        semester: "",
        chinese_score: "",
        math_score: "",
        english_score: "",
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    })
    const onMyFormSubmit = () => {
        console.log("sss")
    }

    return (
        <div>
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 sticky top-0 z-50">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="flex flex-col">
                        <nav className="grid gap-2 text-lg font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <Package2 className="h-6 w-6" />
                                <span className="sr-only">學生管理系統</span>
                            </Link>
                            <Link
                                href="#"
                                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                            >
                                <Home className="h-5 w-5" />
                                Dashboard
                            </Link>
                            <Link
                                href="#"
                                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                Orders
                                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    6
                                </Badge>
                            </Link>
                            <Link
                                href="#"
                                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                            >
                                <Package className="h-5 w-5" />
                                Products
                            </Link>
                            <Link
                                href="#"
                                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                            >
                                <Users className="h-5 w-5" />
                                Customers
                            </Link>
                            <Link
                                href="#"
                                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                            >
                                <LineChart className="h-5 w-5" />
                                Analytics
                            </Link>
                        </nav>
                        <div className="mt-auto">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Upgrade to Pro</CardTitle>
                                    <CardDescription>
                                        Unlock all features and get unlimited access to our support
                                        team.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button size="sm" className="w-full">
                                        Upgrade
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </SheetContent>
                </Sheet>
                <div className="w-full flex-1">
                    <form>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                            />
                        </div>
                    </form>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <CircleUser className="h-5 w-5" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
            <main className="flex flex-1  gap-4 p-4 lg:gap-6 lg:p-6">
                <div className="flex-1 flex flex-col overflow-y-scroll relative scrollbar-hide z-30 p-2">
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onMyFormSubmit)} id="score_form">
                            <FormField
                                control={form.control}
                                name="school_year"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>學生編號</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            四位數字 0001 ~ 9999
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="semester"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>學生姓名</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            姓名至少兩個字
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="chinese_score"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>身分證號</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            國民身分證號
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="math_score"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>電話一</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            至少提供一隻市話號碼
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="english_score"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>電話二</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            選填
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        </form>

                    </Form>
                </div>
                <div className="w-1/3 lg:w-1/3 2xl:w-1/4 flex flex-col gap-4 overflow-hidden sticky top-[84px] h-[90vh]">
                    <Card x-chunk="dashboard-07-chunk-5">
                        <CardHeader>
                            <CardTitle>編輯學生資料</CardTitle>
                            <CardDescription>
                                根據需要更新學生的個人資料。確保所有資訊準確無誤後，點擊儲存按鈕以完成更新
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col xl:grid xl:grid-cols-4 gap-4">
                            <Button size="sm" type="submit" form="score_form" >
                                儲存
                            </Button>
                            <Button size="sm" variant="secondary" className="cursor-default">
                                刪除
                            </Button>
                        </CardContent>
                    </Card>
                </div>

            </main>
        </div>
    );
}


