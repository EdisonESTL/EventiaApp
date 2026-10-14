import { z } from "zod";

export const eventSchema = z.object({
    name: z
    .string({
        error: "El nombre del evento es obligatorio",
    })
    .trim()
    .min(5, "El nombre debe tener minimo 5 caracteres"),

    location: z
    .string()
    .trim()
    .min(1, "La dirección no debe estar vacia"),

    event_type: z.object({
        id: z.number({error: "El tipo de evento es obligatorio"}),
    }),

    event_package: z.object({
        name: z.string({error: "El paquete de evento es obligatorio"})
        .trim()
        .min(1,"El paquete de evento no puede estar sin seleccionar")
    }),

    start_datetime: z
    .string({
        error: "Seleccione una fecha"
    })
    .min(1, "La fecha no puede estar vacia"),

    end_datetime: z
    .string({
        error: "Seleccione un horario"
    })
    .min(1, "La fecha no puede estar vacia")
});