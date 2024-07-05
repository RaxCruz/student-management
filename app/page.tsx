
import Link from "next/link"
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
  Rabbit,
  Settings,
  Turtle,
  Bird,
  Upload,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import NavBar from "./Navbar/page"
import Contents from "./Contents/page"
import TimeCard from "@/components/time-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PrismaClient } from "@prisma/client"
import UserList from "@/components/rwd-user-list"



export default async function Dashboard() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();

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

      </header>
      <Contents />
    </div>
  )
}
