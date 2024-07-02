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

const jsConfetti = new JSConfetti()


const prisma = new PrismaClient()

export default function Contents() {
    const router = useRouter()
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
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
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
        },
    })

    const onMyFormSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)

        try {
            await onSubmitForm(values);

        } catch (error) {
            console.error('Error submitting form:', error);
        }

        jsConfetti.addConfetti()
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
                        {/* <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">個人資料</legend>
            <div className="grid gap-3">
              <Label htmlFor="model">學生編號</Label>
              <input className=" rounded-md border p-[6px]" placeholder="0000"/>
                
            </div>
            <div className="grid gap-3">
              <Label htmlFor="temperature">學生姓名</Label>
              <input className=" rounded-md border p-[6px]" placeholder="王大明"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="temperature">身分證號</Label>
              <input className=" rounded-md border p-[6px]" placeholder="A123456789"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="top-p">電話一</Label>
                <input className=" rounded-md border p-[6px]"/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="top-k">電話二</Label>
                <input className=" rounded-md border p-[6px]"/>
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="temperature">行動電話</Label>
              <input className=" rounded-md border p-[6px]"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="top-p">緊急連絡電話</Label>
                <input className=" rounded-md border p-[6px]"/>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="top-k">緊急聯絡人</Label>
                <input className=" rounded-md border p-[6px]"/>
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="temperature">戶籍地址</Label>
              <input className=" rounded-md border p-[6px]"/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="temperature">通訊地址</Label>
              <input className=" rounded-md border p-[6px]"/>
            </div>
          </fieldset>
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">查詢結果</legend>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>學年</TableHead>
                  <TableHead className="hidden sm:table-cell">學期</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    國文成績
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    數學成績
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    英文成績
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
               
                <TableRow className="">
                <TableCell>
                  <input className=" rounded-md border p-1"/>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                  <input className=" rounded-md border p-1"/>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                  <input className=" rounded-md border p-1"/>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                  <input className=" rounded-md border p-1"/>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                  <input className=" rounded-md border p-1"/>
                  </TableCell>
                </TableRow>
                <TableRow className="">
                  <TableCell>
                  <input className=" rounded-md border p-1"/>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                  <input className=" rounded-md border p-1"/>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                  <input className=" rounded-md border p-1"/>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                  <input className=" rounded-md border p-1"/>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                  <input className=" rounded-md border p-1"/>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </fieldset> */}

                    </Form>
                </div>
                <div className="w-1/3 lg:w-1/3 2xl:w-1/4 flex flex-col gap-4 overflow-hidden sticky top-[84px] h-[90vh]">
                    {/* 上面照片 */}
                    <Card
                        className="overflow-hidden "
                        x-chunk="dashboard-07-chunk-4"
                    >
                        <CardHeader>
                            <CardTitle>Product Images</CardTitle>
                            <CardDescription>
                                Lipsum dolor sit amet, consectetur adipiscing elit
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
                        <CardContent className="flex gap-4">
                            <Link href="/user/create">
                                <Button size="sm" >
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

            </main>
        </div>
    );
}


