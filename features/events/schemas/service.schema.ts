import { z } from "zod";

export const serviceSchema = z.object({
    services: z
    .array(
        z.object({
            id: z.number(),

            quantity: z.number(),

            service: z.object({

                id: z.number(),
                name: z.string(),
            }),
        }),
        {
            error: "Debes seleccionar servicios"
        }
    )
    .nonempty("Debes seleccionar al menos un servicio")
});