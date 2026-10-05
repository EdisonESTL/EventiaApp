import { z } from "zod";

export const eventSchema = z.object({
    name: z
    .string({
        error: "el nombre del evento es obligatorio",
    })
    .trim()
    .min(5, "el nombre debe tener minimo 5 caracteres"),

    location: z
    .string()
    .trim()
    .min(1, "la dirección no debe estar vacia"),

    event_type: z.object({
        id: z.number({error: "el tipo de evento es obligatorio"}),
    }),

    event_package: z.object({
        name: z.string({error: "el paquete de evento es obligatorio"})
        .trim()
        .min(1,"el paquete de evento no puede estar sin seleecionar")
    }),

    start_datetime: z
    .string({
        error: "seleccione una fecha"
    })
    .min(1, "La fecha no puede estar vacia"),

    end_datetime: z
    .string({
        error: "Seleccione un horario"
    })
    .min(1, "la fecha no puede estar vacia")
});