import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function UserDetail({ params }: { params: any }) {
  const formattedID = params.id.toString().padStart(4, "0");
  const users = await prisma.user.findMany({
    where: { student_id: formattedID },
  });
  console.log(users);
  return (
    <div>
      {users.map((user) => (
        <h1>{user.name}</h1>
      ))}
    </div>
  );
}
