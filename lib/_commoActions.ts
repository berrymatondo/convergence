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
      include: {
        currency: true,
        historicalDataCommo: true,
      },
    });

    //console.log("res", commo);

    return {
      success: true,
      data: commo,
    };
  } catch (error) {}
};

// GET historical for a SPECIFIC commo
export const getCommoHsitoMaxDate = async (commoId: number) => {
  try {
    const commo = await prisma.historicalDataCommo.findMany({
      where: {
        staticInfoCommoId: +commoId,
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

// getCommoHsitoPeriodDate
export const getCommoHsitoPeriodDate = async (
  commoId: number,
  limit: number
) => {
  //console.log("Limit", limit);

  try {
    const commo = await prisma.historicalDataCommo.findMany({
      take:
        limit == 1
          ? 5
          : limit == 2
          ? 20
          : limit == 3
          ? 60
          : limit == 4
          ? 252
          : 252,
      where: {
        staticInfoCommoId: +commoId,
      },
      orderBy: {
        date: "desc",
      },
    });

    //console.log("res", commo);

    return {
      success: true,
      data: commo,
      /*       data: {
        close: commo[0],
        close1: commo[1],
        close5: commo[5],
        close20: commo[20],
        close60: commo[60],
        close252: commo[252],
      }, */
    };
  } catch (error) {}
};

// GET last historical for a SPECIFIC commo
export const getLastCommoHsitoMaxDate = async (commoId: number) => {
  try {
    const commo = await prisma.historicalDataCommo.findMany({
      where: {
        staticInfoCommoId: +commoId,
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

/* 
  // Historical data

  const commoH = await prisma.historicalDataCommo.groupBy({
    by: ["staticInfoCommoId"], // Regrouper par catégorie
    _max: {
      date: true, // Obtenir le prix maximum
    },
    where: { type: "H" },

  });

  console.log("commoH", commoH);
  console.log("commoH", commoH[3].staticInfoCommoId);
  console.log("commoH", commoH[3]._max.date);
  console.log("commoH", commos);

  let cs: any = [];
  for (let i = 0; i < commoH.length; i++) {
    const fct = await prisma.historicalDataCommo.findMany({
      where: {
        AND: [
          { staticInfoCommoId: commoH[i].staticInfoCommoId },
          { date: commoH[i]._max.date as string },
        ],
        //staticInfoCommoId: commoH[i].staticInfoCommoId, xgfxg
      },
    });
    if (fct) {
      console.log("fct[0] ", fct[0]);

      cs.push(fct);
      commos = commos.map((c) => ({ ...c, last: fct[0] }));
      console.log("tt", commos);
    }
  }

  console.log("daa", cs);
  console.log("daa", commos[1]);
 */
