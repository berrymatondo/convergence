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
    const user = await prisma.user.findUnique({
      where: {
        id: +continentId,
      },
    });

    return {
      success: true,
      data: user,
    };
  } catch (error) {}
};
