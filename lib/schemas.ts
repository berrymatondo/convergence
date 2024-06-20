import * as z from "zod";

export const RegisterSchema = z
  .object({
    id: z.number().optional(),
    email: z.string().min(1, {
      message: "L'adresse email est obligatoire",
    }),
    username: z.string().min(1, {
      message: "Le nom d'utilisateur est obligatoire",
    }),
    /*     isClient: z.boolean(),*/
    /*     celluleId: z.string().optional(),
    isAdmin: z.boolean(), */
    role: z.string(),
    status: z.string(),
    countryId: z.string().optional(),
    companyId: z.string().optional(),
    password: z.string().min(6, {
      message: "Le mot de passe doit contenir au moins 6 caractères",
    }),
    confirmPassword: z.string().min(6, {
      message: "Le mot de passe doit contenir au moins 6 caractères",
    }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Les mots de passe doivent correspondre",
      path: ["confirmPassword"],
    }
  );

export const LoginSchema = z.object({
  username: z.string().min(1, {
    message: "Le nom d'utilisateur est obligatoire",
  }),
  password: z.string().min(1, { message: "Le mot de pass est obligatoire" }),
});

export const ContactSchema = z.object({
  id: z.number().optional(),
  firstname: z.string().min(1, {
    message: "Le prénom est obligatoire",
  }),
  lastname: z.string().min(1, {
    message: "Le nom est obligatoire",
  }),
  email: z.string().min(1, {
    message: "L'adresse email est obligatoire",
  }),
  message: z.string().min(1, { message: "Le message est obligatoire" }),
  comments: z.string().optional(),
  status: z.string(),
});

export const CountrySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, {
    message: "Le nom est obligatoire",
  }),
  continent: z.string(),
});

export const GoSchema = z.object({
  id: z.number().optional(),
  key: z.string().min(1, {
    message: "La clé est obligatoire",
  }),
  value: z.string().min(1, {
    message: "La valeur est obligatoire",
  }),
  order: z.string(),
  countryId: z.number(),
});

export const YcSchema = z.object({
  id: z.number().optional(),
  tenor: z.string().min(1, {
    message: "Ce champ est obligatoire",
  }),
  yld: z.string().min(1, {
    message: "Ce champ est obligatoire",
  }),
  date: z.string(),

  continent: z.string().optional(),
  countryId: z.number().optional(),
  //isContinent: z.boolean().default(false),
});
