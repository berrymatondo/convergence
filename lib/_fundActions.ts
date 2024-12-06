"use server";
import prisma from "./prisma";

// Get all equities
/* export const getAllStaticEquity = async () => {
  try {
    const equities = await prisma.staticInfoEquity.findMany();

    revalidatePath("/admin/equities");

    return {
      success: true,
      data: equities,
    };
  } catch (error) {}
}; */

// GET SPECIFIC fund
export const getFund = async (fundId: number) => {
  try {
    const fund = await prisma.staticInfoFund.findUnique({
      where: {
        id: +fundId,
      },
      include: {
        country: true,
        currency: true,
        fundCustodiansMapping: true,
        fundAdministratorsMapping: true,
        fundAdvisorsMapping: true,
        fundPromotersMapping: true,
        fundCountryRegisteredForSales: { include: { country: true } },
        fundPromotersManagerMapping: true,
      },
    });

    return {
      success: true,
      data: fund,
    };
  } catch (error) {}
};

// GET Historical data of a SPECIFIC Index
/* export const getHistoricalDataIndex = async (fxId: number) => {
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
 */
