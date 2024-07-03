'use server'
const prisma = new PrismaClient();
import { PrismaClient } from "@prisma/client";



export default async function onScoreDelete(id: any) {
    try {
        const deleteResult = await prisma.score.delete({
            where: {
                id: id
            }
        });

        console.log('Deleted:', deleteResult);
    } catch (error) {
        console.error('Error deleting:', error);
    }
}