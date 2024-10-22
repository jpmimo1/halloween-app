import { FormDataUser } from '@/components/FormDataUser';
import { ShowInvitation } from '@/components/ShowInvitation/ShowInvitation';
import { Button, Divider } from '@nextui-org/react';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { GiDualityMask } from 'react-icons/gi';

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
      <div className='flex flex-col md:flex-row gap-12 items-center justify-between w-full max-w-[1000px] mx-auto py-9'>
        <div className='max-w-[600px] flex flex-col gap-4'>
          <p className='text-5xl md:text-7xl text-center md:text-left font-creepster text-primary'>Happy Halloween!</p>
          {currentGuest ?
            (<p className='text-xl md:text-2xl text-center md:text-left'>
              {`Congratulations ${currentGuest.name}, your attendance as a `}
              <span className='font-creepster text-primary'>{currentGuest.costume?.name}</span>
              {` has been confirmed, we look forward to seeing you.`}
            </p>) :
            (<p className='text-xl md:text-2xl text-center md:text-left'>
              Welcome to the Halloween party, to confirm your attendance, please fill out the form
            </p>)
          }

          <Button size='lg' href='/guests' as={Link} color='primary' variant='ghost' endContent={<GiDualityMask />}
            className='uppercase self-start mt-3 md:mt-6 mx-auto md:mx-0'
          >
            See all guests
          </Button>
        </div>
        <Divider orientation='horizontal' className='md:hidden' />
        <div>
          {currentGuest ? <ShowInvitation guest={currentGuest} /> : <FormDataUser />}
        </div>
      </div>
    </>
  );
}
