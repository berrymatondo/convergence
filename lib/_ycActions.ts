"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";
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
    const { tenor, yld, continent, countryId, date } = result.data;

    console.log("Order", date);

    try {
      const yc = await prisma.yieldCurve.create({
        data: {
          tenor: +data.tenor,
          yield: +data.yld,
          date: data.date,
          continent: data.countryId
            ? undefined
            : (data.continent as ContinentsList),
          countryId: data.countryId ? +data.countryId : undefined,
        },
      });

      revalidatePath(`/admin/countries/${data.countryId}`);
      revalidatePath(`/continents/${data.continent}`);

      return { success: true, data: yc };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

export const updateYC = async (data: Inputs) => {
  //console.log("registerUser", data);

  const result = YcSchema.safeParse(data);

  if (result.success) {
    const { tenor, yld, continent, countryId, date } = result.data;

    //console.log("Order", order, countryId);

    try {
      const yc = await prisma.yieldCurve.update({
        where: {
          id: data.id ? +data.id : undefined,
        },
        data: {
          tenor: +data.tenor,
          yield: +data.yld,
          date: data.date,
          continent: data.countryId
            ? undefined
            : (data.continent as ContinentsList),
          countryId: data.countryId ? +data.countryId : undefined,
        },
      });

      console.log("REFRESH");

      revalidatePath(`/admin/countries/${data.countryId}`);
      revalidatePath(`/continents/${data.continent}`);
      revalidatePath(`/continents`);

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
export const getYC = async (ycId: number) => {
  try {
    const yc = await prisma.yieldCurve.findUnique({
      where: {
        id: ycId,
      },
    });

    return {
      success: true,
      data: yc,
    };
  } catch (error) {}
};

// DELETE country
export const deleteYc = async (
  ycId: number,
  continent: string,
  tenor: number
) => {
  const check = await checkAuth("ADMIN");

  if (check.status == "KO") return check;

  try {
    const yc = await prisma.yieldCurve.delete({
      where: {
        id: +ycId,
      },
    });

    syncYCConti(continent, tenor);

    revalidatePath(`/continents/${continent}`);
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

// DELETE country
//export const syncYC = async () => {
export const syncYC = async (continent: string) => {
  console.log("continent:", continent);

  try {
    // Select  different continent
    const getContis = await prisma.yieldCurve.findMany({
      /*       where: {
        NOT: {
          continent: null,
        },
      },
      distinct: ["continent"], */
      where: {
        continent: continent as ContinentsList,
      },
    });

    console.log("getContis", getContis);

    //Loop on each continent
    //  for (let i = 0; i < getContis.length; i++) {
    //Set H all YC of the contienet
    const updAllYC = await prisma.yieldCurve.updateMany({
      where: {
        continent: continent as ContinentsList,
        change: 0,
      },
      data: {
        type: "H",
      },
    });

    console.log("updAllYC:", updAllYC);

    // Get distinct tenor of a contient
    const getDistincTenor = await prisma.yieldCurve.findMany({
      where: {
        continent: continent as ContinentsList,
      },
      distinct: ["tenor"],
    });

    console.log("getDistincTenor:", getDistincTenor);

    //Get MAX date for each tenor for a contient
    for (let j = 0; j < getDistincTenor.length; j++) {
      const getMaxDate = await prisma.yieldCurve.aggregate({
        where: {
          AND: [
            { continent: continent as ContinentsList },
            { tenor: getDistincTenor[j].tenor },
          ],
        },
        _max: { date: true },
      });

      console.log("getMaxDate:", getMaxDate._max.date);

      /*       const newDate = getMaxDate._max.date
        ?.toLocaleDateString()
        .split("/")
        .reverse()
        .join("-"); */
      //console.log("continent", continent);
      //console.log("tenor", getDistincTenor[j].tenor);
      //  console.log("newDate", newDate);

      // yc.date.toLocaleDateString().split("/").reverse().join("-")

      // Update max tenor
      //console.log("Iciiiiii 1");
      const ycr = await prisma.yieldCurve.updateMany({
        where: {
          AND: [
            { continent: continent as ContinentsList },
            { tenor: getDistincTenor[j].tenor },
            { date: getMaxDate._max.date as string },
          ],
        },
        data: {
          type: "L",
        },
      });

      //console.log("Iciiiiii 2");

      console.log("ycr:", ycr);

      // Get max day of historical data for a Ternor

      const getMaxHDate = await prisma.yieldCurve.aggregate({
        where: {
          AND: [
            { continent: continent as ContinentsList },
            { tenor: getDistincTenor[j].tenor },
            { type: "H" },
          ],
        },
        _max: { date: true },
      });

      console.log("getMaxHDate:", getMaxHDate);
      if (getMaxHDate._max.date) {
        // GEt LIVE DATA
        const LData = await prisma.yieldCurve.findMany({
          where: {
            AND: [
              { continent: continent as ContinentsList },
              { tenor: getDistincTenor[j].tenor },
              { type: "L" },
            ],
          },
        });

        console.log("LData", LData);

        // Get recent Histotic data
        const HData = await prisma.yieldCurve.findMany({
          where: {
            AND: [
              { continent: continent as ContinentsList },
              { tenor: getDistincTenor[j].tenor },
              { type: "H" },
              { date: getMaxHDate._max.date as string },
            ],
          },
        });

        // console.log("HData", HData);
        // console.log("DIFF", LData[0]?.yield - HData[0]?.yield);

        // Update change of Live data
        const updChange = await prisma.yieldCurve.updateMany({
          where: {
            AND: [
              { continent: continent as ContinentsList },
              { tenor: getDistincTenor[j].tenor },
              { date: getMaxDate._max.date as string },
              { type: "L" },
            ],
          },
          data: {
            change: (LData[0]?.yield - HData[0]?.yield) / HData[0]?.yield,
          },
        });
      }
    }
    // }

    const yc = await prisma.yieldCurve.findMany({
      distinct: ["tenor"],
    });

    revalidatePath(`/continents/${continent}`);

    console.log("FOUND", yc);

    return {
      success: true,
      data: yc,
      status: "OK",
      msg: "",
    };
  } catch (error) {}
};

export const syncYCConti = async (continent: string, tenor: number) => {
  console.log("cont: ", continent, tenor);
  const getContYC = await prisma.yieldCurve.findMany({
    where: {
      AND: [{ continent: continent as ContinentsList }, { tenor: tenor }],
    },
  });

  // Set all tenor to H
  if (getContYC.length > 0) {
    //Set H all YC of the contienet
    const updAllYC = await prisma.yieldCurve.updateMany({
      where: {
        AND: [{ continent: continent as ContinentsList }, { tenor: tenor }],
      },
      data: {
        type: "H",
        change: 0,
      },
    });

    console.log("getContYC", getContYC);

    // Get MAX date of this tenor
    const getMaxDate = await prisma.yieldCurve.aggregate({
      where: {
        AND: [{ continent: continent as ContinentsList }, { tenor: tenor }],
      },
      _max: { date: true },
    });

    console.log("getMaxDate:", getMaxDate._max.date);

    //Update to L the tenor max date
    const ycr = await prisma.yieldCurve.updateMany({
      where: {
        AND: [
          { continent: continent as ContinentsList },
          { tenor: tenor },
          { date: getMaxDate._max.date as string },
        ],
      },
      data: {
        type: "L",
      },
    });

    // Get max day of historical data for a Ternor

    const getMaxHDate = await prisma.yieldCurve.aggregate({
      where: {
        AND: [
          { continent: continent as ContinentsList },
          { tenor: tenor },
          { type: "H" },
        ],
      },
      _max: { date: true },
    });

    console.log("getMaxHDate:", getMaxHDate);

    if (getMaxHDate._max.date) {
      // GEt LIVE DATA
      const LData = await prisma.yieldCurve.findMany({
        where: {
          AND: [
            { continent: continent as ContinentsList },
            { tenor: tenor },
            { type: "L" },
          ],
        },
      });

      console.log("LData", LData);

      // Get recent Histotic data
      const HData = await prisma.yieldCurve.findMany({
        where: {
          AND: [
            { continent: continent as ContinentsList },
            { tenor: tenor },
            { type: "H" },
            { date: getMaxHDate._max.date as string },
          ],
        },
      });

      console.log("HData", HData);

      // Update change of Live data
      const updChange = await prisma.yieldCurve.updateMany({
        where: {
          AND: [
            { continent: continent as ContinentsList },
            { tenor: tenor },
            { date: getMaxDate._max.date as string },
            { type: "L" },
          ],
        },
        data: {
          change: (LData[0]?.yield - HData[0]?.yield) / HData[0]?.yield,
        },
      });
    } else {
      // Update change of Live data
      const updChange = await prisma.yieldCurve.updateMany({
        where: {
          AND: [
            { continent: continent as ContinentsList },
            { tenor: tenor },
            { date: getMaxDate._max.date as string },
            { type: "L" },
          ],
        },
        data: {
          change: 0,
        },
      });
    }
  }
};
