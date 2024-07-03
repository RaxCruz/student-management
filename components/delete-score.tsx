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
import { LogOut } from "lucide-react";
import onScoreDelete from "@/app/action/score_delete";

const jsConfetti = new JSConfetti()

export default function DeleteScore({ id }: { id: any }) {

    const router = useRouter()
    const handleDelete = async () => {

        try {
            await onScoreDelete(id);

        } catch (error) {
            console.error('Error delete form:', error);
        }
        jsConfetti.addConfetti()
        router.refresh()

    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="flex items-center w-full bg-destructive cursor-pointer hover:opacity-90 relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ">
                    <LogOut className="mr-2 h-4 w-4 text-white " />
                    <span className="text-white">刪除</span>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>確認刪除此項成績嗎?</AlertDialogTitle>
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
