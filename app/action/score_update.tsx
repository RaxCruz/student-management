"use server";
import { zodResolver } from "@hookform/resolvers/zod";
import { PrismaClient } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import ScoreCard from "@/components/score-card";

const prisma = new PrismaClient()

const formSchema = z.object({
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

export default async function onScoreUpdate(values: z.infer<typeof formSchema>, id: any) {
    console.log(values)
    try {
        const updated_Score = await prisma.score.update({
            where: {
                id: id
            },
            data: {
                school_year: values.school_year,
                semester: values.semester,
                chinese_score: values.chinese_score,
                math_score: values.math_score,
                english_score: values.english_score,
            },
        });

        console.log('Update Score:', updated_Score);
    } catch (error) {
        console.error('Error updating user:', error);
    }
}