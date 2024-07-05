'use server'
const prisma = new PrismaClient();
import { PrismaClient } from "@prisma/client";



export default async function getAllUser() {
    try {
        const deleteResult = await prisma.user.findMany();
        // console.log('Deleted:', deleteResult);
        return deleteResult
    } catch (error) {
        console.error('Error deleting:', error);
    }

}