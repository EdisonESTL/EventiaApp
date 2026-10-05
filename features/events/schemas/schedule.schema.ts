import { z } from "zod";

export const scheduleSchema = z.object({
    title: z
      .string({
        error: "el título de la actividad es obligatorio",
        })
      .trim()
      .min(3, "El título debe tener mínimo 3 caracteres"),
    start_time: z
      .string({
        error: "la hora de inicio es obligatoria",
      })
      .trim()
      .min(3, "La hora de inicio debe tener mínimo 5 caracteres"),
    end_time: z
      .string({
        error: "la hora de finalización es obligatoria",
      })
      .trim()
      .min(3, "La hora de finalización debe tener mínimo 5 caracteres"),
});