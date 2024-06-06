import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

// Get all users
export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();

    revalidatePath("/admin/users");

    return {
      success: true,
      data: users,
    };
  } catch (error) {}
};
