"use server";
import { zodResolver } from "@hookform/resolvers/zod";
import { PrismaClient } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient()


const formSchema = z.object({
    student_id: z.string(),
    school_year: z.number().min(1, {
        message: "",
    }),
    semester: z.number().min(1, {
        message: "",
    }),
    chinese_score: z.number().min(1, {
        message: "",
    }),
    math_score: z.number().min(1, {
        message: "",
    }),
    english_score: z.number().min(1, {
        message: "",
    }),
})

export default async function onScoreAdd(values: z.infer<typeof formSchema>, student_id: any) {

    try {
        const newScore = await prisma.score.create({
            data: {
                student_id: values?.student_id,
                school_year: values?.school_year,
                semester: values?.semester,
                chinese_score: values?.chinese_score,
                math_score: values?.math_score,
                english_score: values?.english_score,
            },
        });

        console.log('Created user:', newScore);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}