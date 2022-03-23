import { PrismaClient } from "@prisma/client";
// import bcrypt from "@node-rs/bcrypt";

const prisma = new PrismaClient();

async function seed() {
//   const email = "rachel@remix.run";

//   // cleanup the existing database
//   await prisma.user.delete({ where: { email } }).catch(() => {
//     // no worries if it doesn't exist yet
//   });

//   const hashedPassword = await bcrypt.hash("rachelrox", 10);

  await prisma.mkscvids.create({
    data: {
      cid: 0,
      time: 46.91,
      link: "2133123sd",
      mode: 0,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
