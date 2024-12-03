"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";

// Get all fxs
export const getAllStaticFx = async () => {
  try {
    const commos = await prisma.staticInfoFx.findMany();

    revalidatePath("/admin/fxrates");

    return {
      success: true,
      data: commos,
    };
  } catch (error) {}
};

// GET SPECIFIC fx
export const getFx = async (fxId: number) => {
  try {
    const commo = await prisma.staticInfoFx.findUnique({
      where: {
        id: +fxId,
      },
      /* include: {
        historicalDataCommo: true,
      }, */
    });

    return {
      success: true,
      data: commo,
    };
  } catch (error) {}
};