import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 10; i++) {
    const devices = new Array(faker.datatype.number({ min: 0, max: 5 }))
      .fill({})
      .map(() => ({
        token: faker.datatype.uuid(),
      }));

    await prisma.topic.create({
      data: {
        name: faker.word.noun(),
        Subscribers: {
          create: devices,
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
