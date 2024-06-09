"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { ContactSchema } from "./schemas";
import bcrypt from "bcrypt";
import { z } from "zod";
import { ContactStatuses, UserRoles, UserStatuses } from "@prisma/client";
import { auth, signIn, signOut } from "@/auth";

type Inputs = z.infer<typeof ContactSchema>;

// Creat contact message
export const createContact = async (data: Inputs) => {
  //console.log("registerUser", data);

  const result = ContactSchema.safeParse(data);

  if (result.success) {
    const { firstname, lastname, email, message } = result.data;

    try {
      const contact = await prisma.contact.create({
        data: {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          message: data.message,
        },
      });

      return { success: true, data: contact };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

// update contact message
export const updateContact = async (data: Inputs) => {
  //console.log("registerUser", data);

  const result = ContactSchema.safeParse(data);

  if (result.success) {
    const { id, firstname, lastname, email, message, status, comments } =
      result.data;

    try {
      const contact = await prisma.contact.update({
        where: {
          id: data.id,
        },
        data: {
          comments: data.comments as string,
          status: data.status as ContactStatuses,
        },
      });
      return { success: true, data: contact };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

// Get all contact messages
export const getContacts = async () => {
  try {
    const contacts = await prisma.contact.findMany();

    revalidatePath("/admin/contacts");

    return {
      success: true,
      data: contacts,
    };
  } catch (error) {}
};

// GET SPECIFIC conctact message
export const getContact = async (contactId: number) => {
  try {
    const contact = await prisma.contact.findUnique({
      where: {
        id: +contactId,
      },
    });

    return {
      success: true,
      data: contact,
    };
  } catch (error) {}
};

// DELETE USER
export const deleteContact = async (userId: number) => {
  const check = await checkAuth("ADMIN");

  if (check.status == "KO") return check;

  try {
    const contact = await prisma.contact.delete({
      where: {
        id: +userId,
      },
    });

    revalidatePath("/admin/contacts");

    return {
      success: true,
      data: contact,
      status: "OK",
      msg: "",
    };
  } catch (error) {}
};

export const checkAuth = async (role: string) => {
  const session = await auth();

  console.log("AUTH SESSION:", session?.user);

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
