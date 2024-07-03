import dynamic from 'next/dynamic';
import { PrismaClient } from "@prisma/client";

const ScoreCard = dynamic(

    () => import("@/components/score-card"),

    { ssr: false }

);
export default async function ScoreEdit({ params }: { params: any }) {
    const prisma = new PrismaClient();
    const score = await prisma.score.findFirst({
        where: { id: params.id },
    });
    const scoreData = {
        student_id: score?.student_id,
        school_year: score?.school_year,
        semester: score?.semester,
        chinese_score: score?.chinese_score,
        math_score: score?.math_score,
        english_score: score?.english_score,
    }
    return (
        <ScoreCard scoreData={scoreData} id={params.id} student_id={scoreData.student_id} />
    )
}