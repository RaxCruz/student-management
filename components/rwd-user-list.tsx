'use client'
import Link from "next/link";
import { useState } from "react"
import { TableCell, TableRow } from "./ui/table";
import { usePathname } from "next/navigation";



export default function UserList({ users }: { users: any }) {
    const pathname = usePathname()
    const currentIndex = pathname.match(/\/(\d+)\//) ? pathname.match(/\/(\d+)\//)[1] : null;
    const [selectedItem, setSelectedItem] = useState(currentIndex);
    const onItemClick = (index: any) => {
        setSelectedItem(index);
    };

    return (
        <>
            {
                users.map((user: any, index: any) => (
                    <Link href={`/user/${user.student_id}`} key={user.id} legacyBehavior className="" >
                        <TableRow className={`cursor-pointer ${user.student_id === selectedItem ? 'bg-secondary' : ''}`} onClick={() => onItemClick(user.student_id)}>

                            <TableCell className="font-medium">

                                {user.student_id}


                            </TableCell>
                            <TableCell className=" sm:table-cell">

                                {user.name}

                            </TableCell>

                        </TableRow>

                    </Link>
                ))
            }
        </>
    )
}