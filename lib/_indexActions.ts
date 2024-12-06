"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { log } from "console";

/* // Get all commos
export const getAllStaticCommo = async () => {
  try {
    const commos = await prisma.staticInfoCommo.findMany();

    revalidatePath("/admin/commodities");

    return {
      success: true,
      data: commos,
    };
  } catch (error) {}
}; */

// GET SPECIFIC commo
export const getIndex = async (indexId: number) => {
  try {
    const commo = await prisma.staticInfoIndex.findUnique({
      where: {
        id: +indexId,
      },
      include: {
        currency: true,
        historicalDataIndex: true,
      },
    });

    //console.log("res", commo);

    return {
      success: true,
      data: commo,
    };
  } catch (error) {}
};
