"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";

// Get all countries
export const getAllStaticCommo = async () => {
  try {
    const commos = await prisma.staticInfoCommo.findMany();

    revalidatePath("/admin/commodities");

    return {
      success: true,
      data: commos,
    };
  } catch (error) {}
};
