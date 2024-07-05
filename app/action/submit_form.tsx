"use server";
import { zodResolver } from "@hookform/resolvers/zod";
import { PrismaClient } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient()


const formSchema = z.object({
    student_id: z.string().min(4, {
        message: "學生編號須為四位數字",
    }),
    name: z.string().min(2, {
        message: "姓名至少2個字",
    }),
    person_id: z.string().min(10, {
        message: "身分證為10碼",
    }),
    phone_1: z.string().min(10, {
        message: "至少提供一支電話, 中間使用-分隔",
    }),
    phone_2: z.string().min(0, {
        message: "",
    }),
    mobile: z.string().min(10, {
        message: "至少提供一支手機號碼",
    }),
    emergency_phone: z.string().min(10, {
        message: "至少提供一支緊急聯絡人號碼",
    }),
    emergency_contact: z.string().min(2, {
        message: "至少提供一位緊急聯絡人姓名"
    }),
    residence_addr: z.string().min(5, {
        message: "必須提供地址"
    }),
    mailing_addr: z.string().min(0, {
        message: ""
    }),
    img_url: z.string(),
    email: z.string()
})

export default async function onSubmitForm(values: z.infer<typeof formSchema>) {

    try {
        const newUser = await prisma.user.create({
            data: {
                id: uuidv4(),
                student_id: values.student_id,
                name: values.name,
                img_url: values.img_url,
                email: `${values.student_id}@gmail.com`,
                person_id: values.person_id,
                phone_1: values.phone_1,
                phone_2: values.phone_2,
                mobile: values.mobile,
                emergency_phone: values.emergency_phone,
                emergency_contact: values.emergency_contact,
                residence_addr: values.residence_addr,
                mailing_addr: values.mailing_addr,
            },
        });

        //console.log('Created user:', newUser);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}