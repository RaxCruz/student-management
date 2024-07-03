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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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

import { Label } from "@/components/ui/label";

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
import onSubmitForm from "@/app/action/submit_form";
import { redirect, useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import JSConfetti from 'js-confetti'
import onUpdateForm from "@/app/action/update_form";
import onScoreUpdate from "@/app/action/score_update";
import onScoreAdd from "@/app/action/score_add";

const jsConfetti = new JSConfetti()


const prisma = new PrismaClient()

export default function CreateUser({ scoreData, id, student_id }: { scoreData: any, id: any, student_id: any }) {
    const router = useRouter()
    console.log(student_id)
    const formSchema = z.object({
        student_id: z.string(),
        school_year: z.coerce.number().min(1, {
            message: "必填學年",
        }),
        semester: z.coerce.number().min(1, {
            message: "必填學期",
        }),
        chinese_score: z.coerce.number().min(0, {
            message: "",
        }),
        math_score: z.coerce.number().min(0, {
            message: "",
        }),
        english_score: z.coerce.number().min(0, {
            message: "",
        }),
    })
    const defaultValues = scoreData ? scoreData : {
        student_id: student_id,
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

    const onMyFormSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(scoreData)
        if (scoreData) {
            try {
                await onScoreUpdate(values, id);

            } catch (error) {
                console.error('Error submitting form:', error);
            }
            jsConfetti.addConfetti()
            router.push(`/user/${scoreData.student_id}`)
            router.refresh()
        } else {
            try {
                await onScoreAdd(values, student_id);

            } catch (error) {
                console.error('Error submitting form:', error);
            }
            jsConfetti.addConfetti()
            router.push(`/user/${student_id}`)
            router.refresh()
        }

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
                        <form onSubmit={form.handleSubmit(onMyFormSubmit)} id="student_form">
                            <FormField
                                control={form.control}
                                name="school_year"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>學生編號</FormLabel>
                                        <FormControl>
                                            <input type="text" value={student_id} disabled className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
                                        </FormControl>
                                        <FormDescription>
                                            請填民國年
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="school_year"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>學年</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            請填民國年
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
                                        <FormLabel>學期</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            學期為 1~3 學期
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
                                        <FormLabel>國文成績</FormLabel>
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
                            <FormField
                                control={form.control}
                                name="math_score"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>數學成績</FormLabel>
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
                            <FormField
                                control={form.control}
                                name="english_score"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>英文成績</FormLabel>
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
                    {/* 上面照片 */}

                    {/* 下面按鈕 */}
                    <Card x-chunk="dashboard-07-chunk-5">
                        <CardHeader>
                            <CardTitle>編輯成績資料</CardTitle>
                            <CardDescription>
                                根據需要更新學生的個人成績資料。確保所有資訊準確無誤後，點擊儲存按鈕以完成更新
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col xl:grid xl:grid-cols-4 gap-4">

                            <Button size="sm" type="submit" form="student_form" >
                                儲存
                            </Button>

                        </CardContent>
                    </Card>
                </div>

            </main>
        </div>
    );
}


