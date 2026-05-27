import { z } from "zod";

export const clientSchema = z.object({
  event_customer: z.object({
    name: z
      .string({
        error: "el nombre del cliente es obligatorio",
        })
      .min(3, "El nombre debe tener mínimo 3 caracteres"),

    phone: z
      .string({
        error: "el telefono del cliente es obligatorio",
        })
      .min(10, "El teléfono debe tener 10 dígitos"),

    email: z
      .string()
      .email("Correo inválido"),
  }),

  description: z
    .string({
        error: "la descripción es obligatorio",
    })
    .min(10, "La descripción es muy corta"),
});
