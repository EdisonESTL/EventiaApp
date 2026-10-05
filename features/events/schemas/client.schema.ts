import { z } from "zod";

export const clientSchema = z.object({
  event_customer: z.object({
    name: z
      .string({
        error: "el nombre del cliente es obligatorio",
        })
      .trim()
      .min(3, "El nombre debe tener mínimo 3 caracteres"),

    phone: z
      .string({
        error: "el telefono del cliente es obligatorio",
        })
      .trim()
      .min(10, "El teléfono debe tener 10 dígitos"),

    email: z
      .string()
      .trim()
      .email("Correo inválido"),
  }),

  description: z
    .string({
        error: "Faltan campos de llenar",
    })
    .trim()
    .min(10, "La descripción es muy corta"),
});
