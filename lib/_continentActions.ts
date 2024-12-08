"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { LoginSchema, RegisterSchema } from "./schemas";
import bcrypt from "bcrypt";
import { z } from "zod";
import { UserRoles, UserStatuses } from "@prisma/client";
import { auth, signIn, signOut } from "@/auth";

export const getContinent = async (continentId: number) => {
  try {
    const user = await prisma.continent.findUnique({
      where: {
        id: +continentId,
      },
      include: {
        countries: {
          include: {
            staticInfoIndex: true,
            currency: true,
            _count: true,
            staticInfoCountry: true,
            staticInfoBond: true,
          },
        },
      },
    });

    return {
      success: true,
      data: user,
    };
  } catch (error) {}
};

// Get all continents
export const getAllContinents = async () => {
  try {
    const continents = await prisma.continent.findMany({
      include: {
        countries: {
          include: {
            staticInfoIndex: true,
            currency: true,
            _count: true,
            staticInfoCountry: true,
          },
        },
      },
    });

    return {
      success: true,
      data: continents,
    };
  } catch (error) {}
};
