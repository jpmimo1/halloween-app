import { FormDataUser } from '@/components/FormDataUser';
import { ShowInvitation } from '@/components/ShowInvitation/ShowInvitation';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

export default async function Home() {
  const cookieStore = cookies();

  const guestId = cookieStore.get('guestId')?.value;



  let currentGuest = null;

  if (guestId) {
    const prisma = new PrismaClient();
    currentGuest = await prisma.guest.findUnique({
      where: { id: guestId }, include: {
        costume: true
      }
    });
    await prisma.$disconnect();
  }



  return (
    <>
      <div>
        {currentGuest ? <ShowInvitation guest={currentGuest} /> : <FormDataUser />}
      </div>
    </>
  );
}
