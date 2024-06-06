import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Admin123", 12);

  const user = await prisma.user.upsert({
    where: {
      // email: "test@gmail.com",
      username: "admin",
    },
    update: {},
    create: {
      email: "admin@gmail.com",
      password: hashedPassword,
      username: "admin",
      role: "ADMIN",
    },
  });

  console.log({ user });

  /*   const zone = await prisma.zone.upsert({
    where: {
      name: "Forest",
    },
    update: {},
    create: {
      name: "Forest",
    },
  });

  console.log({ zone }); */
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
