"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";

// Get all equities
export const getAllStaticEquity = async () => {
  try {
    const equities = await prisma.staticInfoEquity.findMany();

    revalidatePath("/admin/equities");

    return {
      success: true,
      data: equities,
    };
  } catch (error) {}
};

// GET SPECIFIC equity
export const getEquity = async (equityId: number) => {
  try {
    const equity = await prisma.staticInfoEquity.findUnique({
      where: {
        id: +equityId,
      },
      include: {
        country: true,
        currency: true,
        historicalDataEquity: true,
      },
    });

    return {
      success: true,
      data: equity,
    };
  } catch (error) {}
};

// GET Historical data of a SPECIFIC Index
export const getHistoricalDataIndex = async (fxId: number) => {
  //console.log("fxId", fxId);

  try {
    const fx = await prisma.historicalDataIndex.findMany({
      where: {
        staticInfoIndexId: +fxId,
      },
      orderBy: {
        date: "desc",
      },
    });

    //console.log("fx", fx);

    return {
      success: true,
      data: fx,
    };
  } catch (error) {}
};

export const getEquityHsitoMaxDate = async (commoId: number) => {
  try {
    const commo = await prisma.historicalDataEquity.findMany({
      where: {
        /*         AND [staticInfoFxId: +commoId,
      }, */

        AND: [
          {
            staticInfoEquityId: +commoId,
          },
          {
            type: "L",
          },
        ],
      },
      orderBy: {
        date: "desc",
      },
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
