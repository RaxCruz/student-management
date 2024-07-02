'use server'
const prisma = new PrismaClient();
import { PrismaClient } from "@prisma/client";



export default async function onDelete(student_id: any) {
    console.log(student_id)
    try {
        const deleteResult = await prisma.user.delete({
            where: {
                student_id: student_id
            }
        });

        console.log('Deleted:', deleteResult);
    } catch (error) {
        console.error('Error deleting:', error);
    }
}