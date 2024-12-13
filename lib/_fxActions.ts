"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";

// Get all fxs
export const getAllStaticFx = async () => {
  try {
    const commos = await prisma.staticInfoFx.findMany({
      include: {
        currency1: true,
        currency2: true,
        country: true,
        country2: true,
      },
    });

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
    const fx = await prisma.staticInfoFx.findUnique({
      where: {
        id: +fxId,
      },
      include: {
        currency1: true,
        currency2: true,
        country: true,
        country2: true,
        historicalDataFx: true,
      },
    });

    return {
      success: true,
      data: fx,
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

// GET historical for a SPECIFIC commo
export const getFxHsitoMaxDate2 = async (fxId: number) => {
  try {
    const commo = await prisma.historicalDataFx.findMany({
      where: {
        staticInfoFxId: +fxId,
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

export const getFxHsitoPeriodDate = async (fxId: number, limit: number) => {
  //console.log("Limit", limit);

  if (limit == 0) {
    try {
      const commo = await prisma.historicalDataFx.findMany({
        where: {
          staticInfoFxId: +fxId,
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
      const commo = await prisma.historicalDataFx.findMany({
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
          staticInfoFxId: +fxId,
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
