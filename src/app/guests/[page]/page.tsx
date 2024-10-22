import { GridGuests } from "@/components/GridGuests";
import { PaginationGuests } from "@/components/PaginationGuests";
import { PrismaClient } from "@prisma/client";

interface IProps {
  params: { page: string };
}

const guestsByPage = 8;

export default async function Guests({ params }: IProps) {
  const { page } = params;

  const prisma = new PrismaClient();
  const totalGuests = await prisma.guest.count();

  const totalPages = Math.ceil(totalGuests / guestsByPage);

  const guestsPage = await prisma.guest.findMany({
    skip: (Number.parseInt(page) - 1) * guestsByPage,
    take: guestsByPage,
    include: {
      costume: true
    }
  });

  await prisma.$disconnect();

  return (
    <div className="flex flex-col gap-4">
      <GridGuests guests={guestsPage} />
      <PaginationGuests total={totalPages} baseUrl="guests" currentPage={Number.parseInt(page)} />
    </div>
  );

}
