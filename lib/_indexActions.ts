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
        country: true,
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

export const getIndexHsitoMaxDate = async (commoId: number) => {
  try {
    const commo = await prisma.historicalDataIndex.findMany({
      where: {
        /*         AND [staticInfoFxId: +commoId,
      }, */

        AND: [
          {
            staticInfoIndexId: +commoId,
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

export const getIndexHsitoPeriodDate = async (
  indexId: number,
  limit: number
) => {
  //console.log("Limit", limit);

  if (limit == 0) {
    try {
      const commo = await prisma.historicalDataIndex.findMany({
        where: {
          staticInfoIndexId: +indexId,
        },
        orderBy: {
          date: "desc",
        },
      });

      //console.log("res", commo);

      return {
        success: true,
        data: commo,
      };
    } catch (error) {}
  } else {
    try {
      const commo = await prisma.historicalDataIndex.findMany({
        take:
          limit == 1
            ? 5
            : limit == 2
            ? 20
            : limit == 3
            ? 60
            : limit == 4
            ? 120
            : limit == 5
            ? 252
            : limit == 6
            ? 504
            : limit == 7
            ? 1260
            : 1260,
        where: {
          staticInfoIndexId: +indexId,
        },
        orderBy: {
          date: "desc",
        },
      });

      //console.log("res", commo);

      return {
        success: true,
        data: commo,
      };
    } catch (error) {}
  }
};

// GET historical for a SPECIFIC commo
export const getIndexHsitoMaxDate2 = async (indexId: number) => {
  try {
    const commo = await prisma.historicalDataIndex.findMany({
      where: {
        staticInfoIndexId: +indexId,
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
        close1: commo[1],
        close5: commo[5],
        close20: commo[20],
        close60: commo[60],
        close252: commo[252],
      },
    };
  } catch (error) {}
};

// Get all fxs
export const getAllStaticIndexes = async () => {
  try {
    const commos = await prisma.staticInfoIndex.findMany({
      include: {
        currency: true,
        country: true,
      },
    });

    return {
      success: true,
      data: commos,
    };
  } catch (error) {}
};
