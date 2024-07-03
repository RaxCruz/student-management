import dynamic from "next/dynamic";

const ScoreCard = dynamic(

    () => import("@/components/score-card"),

    { ssr: false }

);

export default function ScoreCreate({ params }: { params: any }) {
    const formattedID = params.id.toString().padStart(4, "0");
    return (
        <ScoreCard scoreData='' id='' student_id={formattedID} />
    )
}
