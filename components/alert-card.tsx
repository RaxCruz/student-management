'use client'
import onDelete from "@/app/action/delete_form"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import JSConfetti from 'js-confetti'
import { toast } from "./ui/use-toast";

const jsConfetti = new JSConfetti()

export default function DeleteButton({ student_id }: { student_id: any }) {

    const router = useRouter()
    const handleDelete = async () => {

        try {
            await onDelete(student_id);
            toast({
                title: "成功刪除學生資料",

                duration: 2000,
                variant: 'destructive'
            })

        } catch (error) {
            console.error('Error delete form:', error);
        }
        jsConfetti.addConfetti()
        router.push(`/`)

        router.refresh()

    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">刪除</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>確認刪除學生編號 {student_id} 嗎?</AlertDialogTitle>
                    <AlertDialogDescription>
                        這個動作無法撤銷。這將永久刪除您的帳戶並從我們的伺服器上移除您的資料。
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>繼續</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
