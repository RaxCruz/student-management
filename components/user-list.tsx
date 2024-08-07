'use client'
import Link from "next/link";
import { useEffect, useState } from "react"
import { TableCell, TableRow } from "./ui/table";
import { usePathname } from "next/navigation";



export default function UserList({ users }: { users: any }) {

    const pathname = usePathname()
    let currentIndex = null
    if (pathname.match(/\/(\d+)\/update/)) {
        currentIndex = pathname.match(/\/(\d+)\/update/)[1]
    }
    else if (pathname.match(/\/(\d{4})\//)) {
        currentIndex = pathname.match(/\/(\d{4})\//)[1]
    }
    else if (pathname.match(/\d+$/)) {
        currentIndex = (pathname.match(/\d+$/)[0])
    }


    const [selectedItem, setSelectedItem] = useState(currentIndex);
    useEffect(() => { setSelectedItem(currentIndex) }, [currentIndex])

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