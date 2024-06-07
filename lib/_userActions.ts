"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { RegisterSchema } from "./schemas";
import bcrypt from "bcrypt";
import { z } from "zod";
import { UserRoles, UserStatuses } from "@prisma/client";

type Inputs = z.infer<typeof RegisterSchema>;

export const registerUser = async (data: Inputs) => {
  //console.log("registerUser", data);

  const result = RegisterSchema.safeParse(data);

  if (result.success) {
    const { username, email, role, password, confirmPassword, departmentId } =
      result.data;

    console.log(
      "{email,name,isAdmin,  password, confirmPassword, celluleID }",
      //email,
      username,
      email,
      role,
      password,
      confirmPassword,
      departmentId
    );

    try {
      //const session = await auth();

      //console.log("SESSION", session);

      const foundUser = await prisma.user.findUnique({
        where: {
          username: data.username,
        },
      });

      if (foundUser) return { error: "Ce nom d'utilisateur est déjà utilisé" };

      const foundUser2 = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (foundUser2) return { error: "Cette adresse mail est déjà utilisée" };

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 12);

      //const userTmp: any = session?.user;

      // console.log("DATA", data);

      const user = await prisma.user.create({
        data: {
          username: data.username,
          email: data.email,
          password: hashedPassword,
          role: data.role as UserRoles,
          departmentId: data.departmentId ? +data.departmentId : null,
          // userId: userTmp ? (userTmp.id ? parseInt(userTmp.id) : null) : null,
        },
      });

      return { success: true, data: user };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

// UPDATE USER
export const updateUser = async (data: Inputs) => {
  // console.log("update PERSONNNNNN:", data);

  const resut = RegisterSchema.safeParse(data);
  if (resut.success) {
    let test = data.password;

    if (test == "******") {
      try {
        const foundUser = await prisma.user.findUnique({
          where: {
            username: data.username,
            NOT: {
              id: data.id,
            },
          },
        });

        // console.log("foundUser:", foundUser);

        if (foundUser) return { error: "Cet utilisateur existe déjà (2)" };

        const foundUser2 = await prisma.user.findUnique({
          where: {
            email: data.email,
            NOT: {
              id: data.id,
            },
          },
        });

        if (foundUser2)
          return { error: "Cette adresse mail est déjà utilisée (2)" };

        // Hash password
        // const hashedPassword = await bcrypt.hash("wwwwww", 12);

        // console.log("data:", data);

        const usr = await prisma.user.update({
          where: {
            id: data.id,
          },
          data: {
            username: data.username,
            departmentId: data?.departmentId ? +data?.departmentId : null,
            //password: hashedPassword,
            role: data.role as UserRoles,
            status: data.status as UserStatuses,
            email: data.email,

            //statut: data.status as CelStatuses,
            /*           respoId: data.respoId ? +data.respoId : undefined,
             */
          },
        });
        // console.log("xxxxxxxxxxxxxxxxxxx");

        // console.log("usrusr:", usr);

        revalidatePath("/admin/users");

        return {
          success: true,
          data: usr,
        };
      } catch (error) {}
    } else {
      try {
        const foundUser = await prisma.user.findUnique({
          where: {
            username: data.username,
            NOT: {
              id: data.id,
            },
          },
        });

        //console.log("foundUser:", foundUser);

        if (foundUser) return { error: "Cet utilisateur existe déjà (3)" };

        const foundUser2 = await prisma.user.findUnique({
          where: {
            email: data.email,
            NOT: {
              id: data.id,
            },
          },
        });

        if (foundUser2)
          return { error: "Cette adresse mail est déjà utilisée (3)" };

        const hashedPassword = await bcrypt.hash(data.password, 12);
        const person = await prisma.user.update({
          where: {
            id: data.id ? +data.id : undefined,
          },
          data: {
            username: data.username,
            departmentId: data?.departmentId ? +data?.departmentId : undefined,
            role: data.role as UserRoles,
            email: data.email,
            password: hashedPassword,

            //statut: data.status as CelStatuses,
            /*           respoId: data.respoId ? +data.respoId : undefined,
             */
          },
        });

        revalidatePath("/admin/users");

        return {
          success: true,
          data: person,
        };
      } catch (error) {}
    }
  } else {
    return {
      success: false,
      error: resut.error.format(),
    };
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();

    revalidatePath("/admin/users");

    return {
      success: true,
      data: users,
    };
  } catch (error) {}
};

// GET SPECIFIC USER
export const getUser = async (userId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +userId,
      },
    });

    return {
      success: true,
      data: user,
    };
  } catch (error) {}
};

// DELETE USER
export const deleteUser = async (userId: number) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: +userId,
      },
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      data: user,
    };
  } catch (error) {}
};

// Logout
/* export const logoutUser = async () => {

  await signOut();
};
 */
