import { FormCostume } from "@/components/FormCostume/FormCostume";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Costume() {
  const cookieStore = cookies();

  const guestName = cookieStore.get('guestName')?.value;
  const photoId = cookieStore.get('photoId')?.value;

  if (!guestName || !photoId) {
    redirect('/');
  }

  const prisma = new PrismaClient();

  const listCostumes = await prisma.costume.findMany();

  await prisma.$disconnect();

  return (
    <>
      <div>
        <div className="">
          <FormCostume
            listCostumes={listCostumes}
            photoId={photoId}
            guestName={guestName}
          />
        </div>
      </div>
    </>
  );
}
