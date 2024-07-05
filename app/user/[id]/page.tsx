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
import { PrismaClient } from "@prisma/client";
import UserCard from "@/components/user-card";
import TimeCard from "@/components/time-card";
import DeleteButton from "@/components/rwd-userDeleteButton";
import UserList from "@/components/user-list";
import { ScrollArea } from "@/components/ui/scroll-area";

const prisma = new PrismaClient();



export default async function UserDetail({ params }: { params: any }) {
  const formattedID = params.id.toString().padStart(4, "0");
  const users = await prisma.user.findMany({
    where: { student_id: formattedID },
  });
  const allusers = await prisma.user.findMany();
  const scores = await prisma.score.findMany({
    where: { student_id: formattedID },
  });


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
              <span className="sr-only">學生管理系統</span>
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
                    <UserList users={allusers} />
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
              <Link href="/user/create" className="w-full">
                新增
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/user/${formattedID}/update`} className="w-full">
                編輯
              </Link>
            </DropdownMenuItem>


            <DropdownMenuSeparator />

            <DeleteButton student_id={formattedID} />

          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <UserCard users={users} scores={scores} formattedID={formattedID} />
    </div>
  );
}
