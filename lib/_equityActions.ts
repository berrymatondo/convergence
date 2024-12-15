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
export const getHistoricalDataEquity = async (fxId: number) => {
  //console.log("fxId", fxId);

  try {
    const fx = await prisma.historicalDataEquity.findMany({
      where: {
        staticInfoEquityId: +fxId,
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

export const getEquityHistoPeriodDate = async (
  indexId: number,
  limit: number
) => {
  //console.log("Limit", limit);

  if (limit == 0) {
    try {
      const commo = await prisma.historicalDataEquity.findMany({
        where: {
          staticInfoEquityId: +indexId,
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
      const commo = await prisma.historicalDataEquity.findMany({
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
          staticInfoEquityId: +indexId,
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
export const getEquityHistoMaxDate2 = async (indexId: number) => {
  try {
    const commo = await prisma.historicalDataEquity.findMany({
      where: {
        staticInfoEquityId: +indexId,
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
export const getAllStaticEquities = async () => {
  try {
    const commos = await prisma.staticInfoEquity.findMany({
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
