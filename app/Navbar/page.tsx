import {
  Bell,
  Package2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Link from "next/link";
import TimeCard from "@/components/time-card";

export default async function NavBar() {
  const users = await prisma.user.findMany();

  return (
    <div className="hidden border-r bg-muted/40 md:block skicky top-0 ">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">學生管理系統</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <div className="mt-auto p-4">
            <TimeCard />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>學號</TableHead>
                <TableHead className="hidden sm:table-cell">姓名</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (

                <TableRow className="" key={user.id} >

                  <TableCell className="font-medium">
                    <Link href={`/user/${user.student_id}`} >
                      {user.student_id}

                    </Link>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Link href={`/user/${user.student_id}`} >
                      {user.name}
                    </Link>
                  </TableCell>

                </TableRow>

              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
