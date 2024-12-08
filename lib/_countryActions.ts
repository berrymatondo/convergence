"use server";
import { revalidatePath } from "next/cache";

import { CountrySchema } from "./schemas";
import bcrypt from "bcrypt";
import { z } from "zod";
import { auth, signIn, signOut } from "@/auth";
import { ContinentsList } from "@prisma/client";
import prisma from "./prisma";
type Inputs = z.infer<typeof CountrySchema>;

// Create country
export const createCountry = async (data: Inputs) => {
  //console.log("registerUser", data);

  const result = CountrySchema.safeParse(data);

  if (result.success) {
    const { name, continent } = result.data;

    try {
      const country = await prisma.country.create({
        data: {
          name: data.name,
          continent: data.continent as ContinentsList,
        },
      });
      revalidatePath("/admin/countries");

      return { success: true, data: country };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

// update country
export const updateCountry = async (data: Inputs) => {
  //console.log("registerUser", data);

  const result = CountrySchema.safeParse(data);

  if (result.success) {
    const { id, name, continent } = result.data;

    try {
      const country = await prisma.country.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name as string,
          continent: data.continent as ContinentsList,
        },
      });
      revalidatePath("/admin/country");
      return { success: true, data: country };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

// Get all countries
export const getAllCountries = async () => {
  try {
    const countries = await prisma.country.findMany();

    revalidatePath("/admin/countries");

    return {
      success: true,
      data: countries,
    };
  } catch (error) {}
};

// Get all countries
export const getCountriesByContinent = async (continent: string) => {
  try {
    const countries = await prisma.country.findMany({
      where: {
        continent: continent as ContinentsList,
      },
      orderBy: {
        name: "asc",
      },
    });

    revalidatePath("/admin/countries");

    return {
      success: true,
      data: countries,
    };
  } catch (error) {}
};

// GET SPECIFIC country
export const getCountry = async (countryId: number) => {
  try {
    const country = await prisma.country.findUnique({
      where: {
        id: +countryId,
      },
      include: {
        gos: true,
        yieldcurve: true,
        fxMapping: {
          include: {
            staticInfoFx: {
              include: { currency1: true, currency2: true },
            },
          },
        },
        countryIndexMapping: {
          include: {
            staticInfoIndex: true,
          },
        },
      },
    });

    return {
      success: true,
      data: country,
    };
  } catch (error) {}
};

// DELETE country
export const deleteCountry = async (countryId: number) => {
  const check = await checkAuth("ADMIN");

  if (check.status == "KO") return check;

  try {
    const country = await prisma.country.delete({
      where: {
        id: +countryId,
      },
    });

    revalidatePath("/admin/countries");

    return {
      success: true,
      data: country,
      status: "OK",
      msg: "",
    };
  } catch (error) {}
};

export const checkAuth = async (role: string) => {
  const session = await auth();

  //console.log("AUTH SESSION:", session?.user);

  let user: any = session?.user;
  let status = "KO";
  if (user?.role == role) status = "OK";

  if (user?.status != "ACTIF") status = "KO";

  return {
    success: true,
    data: "",
    status: status,
    msg:
      status == "OK"
        ? ""
        : "Vous n'avez pas les droits nécessaires pour effectuer cette opération",
  };
};

// GET Static  country
export const getStaticInfoCountry = async (countryId: number) => {
  try {
    const country = await prisma.staticInfoCountry.findUnique({
      where: {
        id: +countryId,
      },
      include: {
        country: {
          include: {
            staticInfoBond: {
              include: {
                couponCurrency: true,
                principalCurrency: true,
                country: true,
                domicile: true,
              },
            },
          },
        },
      },
    });

    return {
      success: true,
      data: country,
    };
  } catch (error) {}
};
