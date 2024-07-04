'use client'
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

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
import DeleteButton from "@/components/alert-card";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export default function UserDetail({ params }: { params: any }) {

    const componentRef = useRef(null);

    const users = [{
        id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
        student_id: "0001",
        name: "王成立",
        image_url: "",
        email: "ske234@gmail.com",
        person_id: "T121852584",
        phone_1: "05-2846586",
        phone_2: "",
        mobile: "098254565",
        emergency_phone: "096542236",
        emergency_contact: "王海其",
        residence_addr: "嘉義市國華街23號",
        mailing_addr: "嘉義市國華街23號",
    },
    ]

    const scores = [{
        id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
        student_id: "0001",
        school_year: 113,
        semester: 1,
        chinese_score: 66,
        math_score: 75,
        english_score: 75,
    },]

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
                <form className="grid flex-1 flex items-start gap-6 overflow-y-scroll relative scrollbar-hide z-30 print:p-8" ref={componentRef} >

                    {users.map((user) => (
                        <fieldset className="grid gap-6 rounded-lg border p-4" key={user.id}>
                            <legend className="-ml-1 px-1 text-sm font-medium">個人資料</legend>
                            <div className="grid gap-3">
                                <Label htmlFor="model">學生編號</Label>
                                <div className=" rounded-md border p-2">
                                    <p className="text-sm  min-h-[20px]">{user.student_id}</p>
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="temperature">學生姓名</Label>
                                <div className=" rounded-md border p-2">
                                    <p className="text-sm  min-h-[20px]">{user.name}</p>
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="temperature">身分證號</Label>
                                <div className=" rounded-md border p-2">
                                    <p className="text-sm  min-h-[20px]">{user.person_id}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="top-p">電話一</Label>
                                    <div className=" rounded-md border p-2">
                                        <p className="text-sm  min-h-[20px]">{user.phone_1}</p>
                                    </div>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="top-k">電話二</Label>
                                    <div className=" rounded-md border p-2">
                                        <p className="text-sm  min-h-[20px]">{user.phone_2}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="temperature">行動電話</Label>
                                <div className=" rounded-md border p-2">
                                    <p className="text-sm  min-h-[20px]">{user.mobile}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="top-p">緊急連絡電話</Label>
                                    <div className=" rounded-md border p-2">
                                        <p className="text-sm  min-h-[20px]">{user.emergency_phone}</p>
                                    </div>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="top-k">緊急聯絡人</Label>
                                    <div className=" rounded-md border p-2">
                                        <p className="text-sm  min-h-[20px]">{user.emergency_contact}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="temperature">戶籍地址</Label>
                                <div className=" rounded-md border p-2">
                                    <p className="text-sm  min-h-[20px]">{user.residence_addr}</p>
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="temperature">通訊地址</Label>
                                <div className=" rounded-md border p-2">
                                    <p className="text-sm  min-h-[20px]">{user.mailing_addr}</p>
                                </div>
                            </div>
                        </fieldset>
                    ))}



                    <fieldset className="grid gap-6 rounded-lg border p-4 ">
                        <legend className="-ml-1 px-1 text-sm font-medium">查詢結果</legend>
                        <Table className='print:w-full print:p-0'>
                            <TableHeader className='print:w-full print:p-0'>
                                <TableRow className='print:w-full print:p-0'>
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
                                {scores.map((score: any) => (
                                    <TableRow key={score.id}>
                                        <TableCell>
                                            <div className="font-medium">{score.school_year}</div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                {score.semester}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                {score.chinese_score}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                {score.math_score}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                {score.english_score}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </fieldset>
                </form>
                <div className="w-1/3 lg:w-1/3 2xl:w-1/4 flex flex-col gap-4 overflow-hidden sticky top-[84px] h-[90vh]">
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
                        <CardContent className="lg:flex gap-8 grid-2">
                            <Link href="/user/create">
                                <Button size="sm" >
                                    新增
                                </Button>
                            </Link>
                            <Button size="sm" variant="secondary" className="cursor-default">
                                儲存
                            </Button>
                            <DeleteButton student_id='0001' />
                            <Button size="sm" >
                                <ReactToPrint
                                    trigger={() => <button>列印</button>}
                                    content={() => componentRef.current}
                                />
                            </Button>
                        </CardContent>
                    </Card>
                </div>

            </main>
        </div>
    );
}
