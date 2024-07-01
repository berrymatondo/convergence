"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";

// Get all commos
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

// GET SPECIFIC commo
export const getCommo = async (commoId: number) => {
  try {
    const commo = await prisma.staticInfoCommo.findUnique({
      where: {
        id: +commoId,
      },
      /*       include: {
        gos: true,
        yieldcurve: true,
      }, */
    });

    return {
      success: true,
      data: commo,
    };
  } catch (error) {}
};
