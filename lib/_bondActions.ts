"use server";
import prisma from "./prisma";

// GET SPECIFIC bond
export const getBond = async (bondId: number) => {
  try {
    const bond = await prisma.staticInfoBond.findUnique({
      where: {
        id: +bondId,
      },
      include: {
        country: true,
        couponCurrency: true,
        principalCurrency: true,
        domicile: true,
        market: true,
      },
    });

    return {
      success: true,
      data: bond,
    };
  } catch (error) {}
};
