import { GridGuests } from "@/components/GridGuests";
import { PaginationGuests } from "@/components/PaginationGuests";
import { PrismaClient } from "@prisma/client";

interface IProps {
  params: { page: string };
}

const guestsByPage = 3;

export default async function Guests({ params }: IProps) {
  const { page } = params;

  console.log(page);

  const prisma = new PrismaClient();
  const totalGuests = await prisma.guest.count();

  const totalPages = Math.ceil(totalGuests / guestsByPage);
  console.log(totalGuests);
  console.log(totalPages);

  const guestsPage = await prisma.guest.findMany({
    skip: (Number.parseInt(page) - 1) * guestsByPage,
    take: guestsByPage,
    include: {
      costume: true
    }
  });

  console.log(guestsPage);

  await prisma.$disconnect();

  return (
    <div className="flex flex-col gap-4">
      <GridGuests guests={guestsPage} />
      <PaginationGuests total={totalPages} baseUrl="guests" currentPage={Number.parseInt(page)} />
    </div>);

}
