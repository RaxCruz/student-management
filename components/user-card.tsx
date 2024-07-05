'use client'

import Link from "next/link";
import {
    ChevronDown,
    Edit,
    Eraser,
    LogOut,
    MoreHorizontal,
    PenLine,
    Pencil,
    Plus,
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
import { useRef } from "react";
import ReactToPrint from 'react-to-print';
// import DeleteButton from "./alert-card";
import dynamic from 'next/dynamic';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
const DeleteButton = dynamic(

    () => import('./alert-card'),

    { ssr: false }

);
const DeleteScore = dynamic(

    () => import('./delete-score'),

    { ssr: false }

);
export default function UserCard({ users, scores, formattedID }: { users: any, scores: any, formattedID: any }) {
    const componentRef = useRef(null);
    const router = useRouter();
    return (
        <main className="flex flex-1  gap-4 p-4 lg:gap-6 lg:p-6">
            <form className="grid flex-1 flex items-start gap-6 overflow-y-scroll relative scrollbar-hide z-30 print:p-4" ref={componentRef}>

                {users.map((user: any) => (
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



                <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">查詢結果</legend>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>學年</TableHead>
                                <TableHead className=" sm:table-cell">學期</TableHead>
                                <TableHead className=" sm:table-cell">
                                    國文成績
                                </TableHead>
                                <TableHead className=" sm:table-cell">
                                    數學成績
                                </TableHead>
                                <TableHead className=" sm:table-cell">
                                    英文成績
                                </TableHead>
                                <TableHead className="print:hidden hidden sm:table-cell">
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {scores.map((score: any) => (
                                <TableRow key={score.id}>
                                    <TableCell>
                                        <div className="font-medium">{score.school_year}</div>
                                    </TableCell>
                                    <TableCell className="sm:table-cell">
                                        <div className="font-medium">
                                            {score.semester}
                                        </div>
                                    </TableCell>
                                    <TableCell className="sm:table-cell">
                                        <Badge className="text-xs" variant="secondary">
                                            {score.chinese_score}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="sm:table-cell">
                                        <Badge className="text-xs" variant="secondary">
                                            {score.math_score}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="sm:table-cell">
                                        <Badge className="text-xs" variant="secondary">
                                            {score.english_score}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="print:hidden sm:table-cell ">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    aria-haspopup="true"
                                                    size="icon"
                                                    variant="ghost"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <Link href={`/score/${score.student_id}/${score.id}`} className="w-full">
                                                        <div className="flex items-center"><Edit className="mr-2 h-4 w-4" />編輯</div>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DeleteScore id={score.id} />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow className="print:hidden">
                                <TableCell colSpan={6} className=" text-center cursor-pointer w-full" onClick={() => { router.push(`/score/${users[0].student_id}/create`) }}>
                                    <ChevronDown className="inline-block animate-bounce" />
                                </TableCell></TableRow>
                        </TableBody>
                    </Table>
                </fieldset>
            </form>
            <div className="max-md:hidden w-1/3 lg:w-1/3 2xl:w-1/4 flex flex-col gap-4 overflow-hidden sticky top-[84px] h-[90vh]">
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
                        <Link href="/user/create" >
                            <Button size="sm" className="w-full">
                                新增
                            </Button>
                        </Link>
                        <Link href={`/user/${formattedID}/update`} >
                            <Button size="sm" className="w-full">
                                編輯
                            </Button>
                        </Link>
                        <Button size="sm" variant="secondary" className="cursor-default">
                            儲存
                        </Button>
                        <DeleteButton student_id={formattedID} />


                        <ReactToPrint
                            trigger={() => <Button size="sm" >列印</Button>}
                            content={() => componentRef.current}
                        />

                    </CardContent>
                </Card>
            </div>
        </main>
    )
}