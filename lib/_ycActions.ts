"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";
import { z } from "zod";
import { auth, signIn, signOut } from "@/auth";
import { ContinentsList } from "@prisma/client";
import { YcSchema } from "./schemas";

type Inputs = z.infer<typeof YcSchema>;

// Create YC
export const createYC = async (data: Inputs) => {
  //console.log("registerUser", data);

  const result = YcSchema.safeParse(data);

  if (result.success) {
    const { tenor, yld, continent, countryId } = result.data;

    //console.log("Order", order, countryId);

    try {
      const yc = await prisma.yieldCurve.create({
        data: {
          tenor: +data.tenor,
          yield: +data.yld,
          continent: data.countryId
            ? undefined
            : (data.continent as ContinentsList),
          countryId: data.countryId ? +data.countryId : undefined,
        },
      });
      revalidatePath(`/admin/countries/${data.countryId}`);

      return { success: true, data: yc };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

// update yield curve
/* export const updateGO = async (data: Inputs) => {
  //console.log("registerUser", data);

  const result = GoSchema.safeParse(data);

  if (result.success) {
    const { id, key, value, order, countryId } = result.data;

    try {
      const go = await prisma.go.update({
        where: {
          id: data.id ? +data.id : undefined,
        },
        data: {
          key: data.key,
          value: data.value,
          order: +data.order,
          countryId: +data.countryId,
        },
      });
      revalidatePath(`/admin/countries/${data.countryId}`);
      return { success: true, data: go };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};
 */
// Get all countries
/* export const getAllGO = async () => {
  try {
    const gos = await prisma.go.findMany();

    revalidatePath("/admin/countries");

    return {
      success: true,
      data: gos,
    };
  } catch (error) {}
}; */

// Get all gos by country
/* export const getGosByCountry = async (countryId: string) => {
  try {
    const gos = await prisma.go.findMany({
      where: {
        id: +countryId,
      },
    });
    revalidatePath("/admin/countries");

    return {
      success: true,
      data: gos,
    };
  } catch (error) {}
}; */

// GET SPECIFIC go
/* export const getGO = async (goId: number) => {
  try {
    const go = await prisma.go.findUnique({
      where: {
        id: goId,
      },
    });

    return {
      success: true,
      data: go,
    };
  } catch (error) {}
}; */

// DELETE country
export const deleteYc = async (ycId: number) => {
  const check = await checkAuth("ADMIN");

  if (check.status == "KO") return check;

  try {
    const yc = await prisma.yieldCurve.delete({
      where: {
        id: +ycId,
      },
    });

    revalidatePath(`/admin/countries/${ycId}`);

    return {
      success: true,
      data: yc,
      status: "OK",
      msg: "",
    };
  } catch (error) {}
};

export const checkAuth = async (role: string) => {
  const session = await auth();

  // console.log("AUTH SESSION:", session?.user);

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
