'use client'
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
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useState } from "react"


export default function NavBar(){

        const [time, setTime] = useState(new Date());
      
        useEffect(() => {
          const interval = setInterval(() => {
            setTime(new Date());
          }, 1000);
      
          // Clean up interval on component unmount
          return () => clearInterval(interval);
        }, []);

        const formattedTime = time.toLocaleTimeString();
        const date = new Date('2024-07-01'); // Example: creating a Date object for July 1, 2024

// Convert Gregorian year to ROC year
const rocYear = date.getFullYear() - 1911;

// Extract month and day, ensuring they are zero-padded
const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed, so add 1
const day = date.getDate().toString().padStart(2, '0');

// Format ROC date string
const taiwanDate = `${rocYear}/${month}/${day}`;
   
          
         
return(
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
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-0 pt-2 md:p-2">
              <CardTitle className="text-center">{taiwanDate}</CardTitle>
                <CardDescription className="text-center">
                  當前時間
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                {formattedTime}
                </Button>
              </CardContent>
            </Card>
          </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>學號</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            姓名
                          </TableHead>
                        
                        
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                      <TableRow className="">
                          <TableCell>
                            <div className="font-medium">0009</div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                        </TableRow>
                        <TableRow className="">
                          <TableCell>
                            <div className="font-medium">0010</div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                        </TableRow>
                        <TableRow className="">
                          <TableCell>
                            <div className="font-medium">0011</div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                        </TableRow>
                        <TableRow className="">
                          <TableCell>
                            <div className="font-medium">0014</div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                        </TableRow>
                        <TableRow className="">
                          <TableCell>
                            <div className="font-medium">0015</div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
          
          </div>
        
        </div>
      </div>
)
}