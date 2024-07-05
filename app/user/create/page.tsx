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
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import JSConfetti from 'js-confetti'
import onUpdateForm from "@/app/action/update_form";
import TimeCard from "@/components/time-card";
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster";
import UserList from "@/components/user-list";
import { useEffect, useState } from "react";
import getAllUser from "@/app/action/user_getAll";
import { ScrollArea } from "@/components/ui/scroll-area";

const jsConfetti = new JSConfetti()


const prisma = new PrismaClient()

export default function CreateUser({ studentData, id }: { studentData: any, id: any }) {
    const router = useRouter()
    const [users, setUsers] = useState(null);


    useEffect(() => {
        const getUsers = async () => {

            const res = await getAllUser()
            setUsers(res);
        };
        getUsers()
    }, []);
    const formSchema = z.object({
        student_id: z.string().min(4, {
            message: "學生編號須為四位數字",
        }),
        name: z.string().min(2, {
            message: "姓名至少2個字",
        }),
        person_id: z.string().min(10, {
            message: "身分證為10碼",
        }),
        phone_1: z.string().min(10, {
            message: "至少提供一支電話, 中間使用-分隔",
        }),
        phone_2: z.string().min(0, {
            message: "",
        }),
        mobile: z.string().min(10, {
            message: "至少提供一支手機號碼",
        }),
        emergency_phone: z.string().min(10, {
            message: "至少提供一支緊急聯絡人號碼",
        }),
        emergency_contact: z.string().min(2, {
            message: "至少提供一位緊急聯絡人姓名"
        }),
        residence_addr: z.string().min(5, {
            message: "必須提供地址"
        }),
        mailing_addr: z.string().min(0, {
            message: ""
        }),
        img_url: z.string()
    })
    const defaultValues = studentData ? studentData : {
        student_id: "",
        name: "",
        person_id: "",
        phone_1: "",
        phone_2: "",
        mobile: "",
        emergency_phone: "",
        emergency_contact: "",
        residence_addr: "",
        mailing_addr: "",
        img_url: "",
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    })

    const onMyFormSubmit = async (values: z.infer<typeof formSchema>) => {
        const differences: any = {};
        const newuser: any = {}
        for (let key in values) {
            if (values.hasOwnProperty(key)) {
                let chinese_key = ""
                if (key == 'emergency_contact') chinese_key = '緊急聯絡人'
                if (key == 'emergency_phone') chinese_key = '緊急聯絡電話'
                if (key == 'mailing_addr') chinese_key = '通訊地址'
                if (key == 'mobile') chinese_key = '行動電話'
                if (key == 'name') chinese_key = '學生姓名'
                if (key == 'person_id') chinese_key = '身分證號'
                if (key == 'phone_1') chinese_key = '電話一'
                if (key == 'phone_2') chinese_key = '電話二'
                if (key == 'residence_addr') chinese_key = '戶籍地址'
                if (key == 'student_id') chinese_key = '學生編號'

                if (!studentData) {
                    newuser[chinese_key] = values[key]
                }

                else if (values[key] !== studentData[key]) {

                    differences[chinese_key] = values[key];
                }

            }
        }

        if (studentData) {
            try {
                await onUpdateForm(values, id);

            } catch (error) {
                console.error('Error submitting form:', error);
            }
            if (Object.keys(differences).length === 0) {
                toast({
                    title: "成功更改學生資料:",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">無更新</code>
                        </pre>
                    ),
                    duration: 2000,
                })
            } else {
                toast({
                    title: "成功更改學生資料:",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{JSON.stringify(differences, null, 2)}</code>
                        </pre>
                    ),
                    duration: 2000,
                })
            }
            jsConfetti.addConfetti()
        }
        else {
            try {
                await onSubmitForm(values);

            } catch (error) {
                console.error('Error submitting form:', error);
            }
            toast({
                title: "成功更改學生資料:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(newuser, null, 2)}</code>
                    </pre>
                ),
                duration: 2000,
            })
            jsConfetti.addConfetti()
        }


        router.push(`/user/${values.student_id}`)

        router.refresh()
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
                        <div className="flex-1">
                            <Link href="/" className="flex items-center gap-2 font-semibold">
                                <Package2 className="h-6 w-6" />
                                <span className="">學生管理系統</span>
                            </Link>
                            <div className="mt-8 p-0">
                                <TimeCard />
                            </div>
                            <ScrollArea className="h-[70vh] w-full ">
                                <Table className="">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>學號</TableHead>
                                            <TableHead className="hidden sm:table-cell">姓名</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <UserList users={users} />
                                    </TableBody>
                                </Table>
                            </ScrollArea>
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
                        <Button variant="secondary" size="icon" className="rounded-full md:hidden">
                            <CircleUser className="h-5 w-5" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>操作</DropdownMenuLabel>
                        <DropdownMenuSeparator />



                        <DropdownMenuItem>
                            <Button size="sm" variant="ghost" type="submit" form="student_form" className="block w-full p-0 m-0 h-auto text-left">
                                儲存
                            </Button>
                        </DropdownMenuItem>


                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
            <main className="flex flex-1  gap-4 p-4 lg:gap-6 lg:p-6">

                <div className="flex-1 flex flex-col overflow-y-scroll relative scrollbar-hide z-30 p-2">
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onMyFormSubmit)} id="student_form">
                            <FormField
                                control={form.control}
                                name="student_id"
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
                                name="name"
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
                                name="person_id"
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
                                name="phone_1"
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
                                name="phone_2"
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
                            <FormField
                                control={form.control}
                                name="mobile"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>行動電話</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            只少提供一隻行動電話
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="emergency_phone"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>緊急聯絡電話</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            只少提供一隻緊急聯絡人電話
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="emergency_contact"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>緊急聯絡人</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            只少提供一位緊急聯絡人
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="residence_addr"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>戶籍地址</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            必須提供戶籍地址
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="mailing_addr"
                                render={({ field }: { field: any }) => (
                                    <FormItem>
                                        <FormLabel>通訊地址</FormLabel>
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
                <div className="max-md:hidden  w-1/3 lg:w-1/3 2xl:w-1/4 flex flex-col gap-4 overflow-hidden sticky top-[84px] h-[90vh]">
                    {/* 上面照片 */}
                    <Card
                        className="overflow-hidden "
                        x-chunk="dashboard-07-chunk-4"
                    >
                        <CardHeader>
                            <CardTitle>個人相片</CardTitle>
                            <CardDescription>
                                上傳至多三張個人照片
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="grid gap-2">
                                <Image
                                    alt="Product image"
                                    className="aspect-square w-full rounded-md object-cover"
                                    height="300"
                                    src="/placeholder.svg"
                                    width="300"
                                />
                                <div className="grid grid-cols-3 gap-2">
                                    <button>
                                        <Image
                                            alt="Product image"
                                            className="aspect-square w-full rounded-md object-cover"
                                            height="84"
                                            src="/placeholder.svg"
                                            width="84"
                                        />
                                    </button>
                                    <button>
                                        <Image
                                            alt="Product image"
                                            className="aspect-square w-full rounded-md object-cover"
                                            height="84"
                                            src="/placeholder.svg"
                                            width="84"
                                        />
                                    </button>
                                    <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                        <Upload className="h-4 w-4 text-muted-foreground" />
                                        <span className="sr-only">Upload</span>
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/* 下面按鈕 */}
                    <Card x-chunk="dashboard-07-chunk-5">
                        <CardHeader>
                            <CardTitle>編輯學生資料</CardTitle>
                            <CardDescription>
                                根據需要更新學生的個人資料。確保所有資訊準確無誤後，點擊儲存按鈕以完成更新
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col xl:grid xl:grid-cols-4 gap-4">
                            <Link href="/user/create">
                                <Button size="sm" className="w-full">
                                    新增
                                </Button>
                            </Link>
                            <Button size="sm" type="submit" form="student_form" >
                                儲存
                            </Button>
                            <Button size="sm" variant="secondary" className="cursor-default">
                                刪除
                            </Button>
                            <Button size="sm" variant="secondary" className="cursor-default">
                                列印
                            </Button>
                        </CardContent>
                    </Card>

                </div>

            </main >
        </div >
    );
}


