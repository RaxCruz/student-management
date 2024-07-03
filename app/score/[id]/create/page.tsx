import dynamic from "next/dynamic";

const CreateUser = dynamic(

    () => import("@/components/score-card"),

    { ssr: false }

);

export default function ScoreCreate({ params }: { params: any }) {
    return (

        <CreateUser scoreData='' id='' student_id={params.id} />
    )
}
