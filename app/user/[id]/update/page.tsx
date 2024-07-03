
import { PrismaClient } from "@prisma/client";
import dynamic from 'next/dynamic';
const CreateUser = dynamic(

    () => import("../../create/page"),

    { ssr: false }

);

export default async function UpdateUser({ params }: { params: any }) {
    const prisma = new PrismaClient();
    const formattedID = params.id.toString().padStart(4, "0");
    const users = await prisma.user.findFirst({
        where: { student_id: formattedID },
    });
    const studentData = {
        student_id: users?.student_id,
        name: users?.name,
        person_id: users?.person_id,
        phone_1: users?.phone_1,
        phone_2: users?.phone_2,
        mobile: users?.mobile,
        emergency_phone: users?.emergency_phone,
        emergency_contact: users?.emergency_contact,
        residence_addr: users?.residence_addr,
        mailing_addr: users?.mailing_addr,
        img_url: users?.img_url,
    }
    return (
        <CreateUser studentData={studentData} id={users?.id} />
    )
}