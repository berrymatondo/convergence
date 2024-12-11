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

// GET Historical data of a SPECIFIC fx
export const getHistoricalDataFx = async (fxId: number) => {
  //console.log("fxId", fxId);

  try {
    const fx = await prisma.historicalDataFx.findMany({
      where: {
        staticInfoFxId: +fxId,
      },
      orderBy: {
        date: "desc",
      },
    });

    // console.log("fx", fx);

    return {
      success: true,
      data: fx,
    };
  } catch (error) {}
};

export const getFXHsitoMaxDate = async (commoId: number) => {
  try {
    const commo = await prisma.historicalDataFx.findMany({
      where: {
        /*         AND [staticInfoFxId: +commoId,
      }, */

        AND: [
          {
            staticInfoFxId: +commoId,
          },
          {
            type: "L",
          },
        ],
      },

      /*       orderBy: {
        date: "desc",
      }, */
    });

    //console.log("res", commo);

    return {
      success: true,
      data: {
        close: commo[0],
      },
    };
  } catch (error) {}
};
