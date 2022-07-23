import { PrismaClient } from '@prisma/client';
import Stocks from '../data/Stocks';
import Users from '../data/Users';
import { createUserService } from '../services/userServiceOld';

const prisma = new PrismaClient();

async function main() {
  //await prisma.user.createMany({
  //  data: Users,
  //});

  await prisma.stocks.createMany({
    data: Stocks,
  });

  //const users = await prisma.user.findMany();

  Users.forEach(async (user) => {
    await createUserService(user);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
