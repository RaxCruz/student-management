'use client'
import Link from "next/link";
import { useState } from "react"
import { TableCell, TableRow } from "./ui/table";
import { usePathname } from "next/navigation";



export default function UserList({ users }: { users: any }) {
    const pathname = usePathname()
    const currentIndex = parseInt(pathname.match(/\d+$/), 10)
    const [selectedItem, setSelectedItem] = useState(currentIndex);
    const onItemClick = (index: any) => {
        setSelectedItem(index);
    };
    return (
        <>
            {
                users.map((user: any, index: any) => (
                    <Link href={`/user/${user.student_id}`} key={user.id} legacyBehavior className="" >
                        <TableRow className={`cursor-pointer ${currentIndex === index + 1 ? 'bg-secondary' : ''}`} onClick={() => onItemClick(index)}>

                            <TableCell className="font-medium">

                                {user.student_id}


                            </TableCell>
                            <TableCell className="hidden sm:table-cell">

                                {user.name}

                            </TableCell>

                        </TableRow>

                    </Link>
                ))
            }
        </>
    )
}