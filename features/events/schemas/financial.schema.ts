import { z } from "zod";

export const financialSchema = z.object({
    receipt_type: z.object({
        name: z
        .string({
            error: "Selecciona un tipo de comprobante"
        })
        .min(1, "Selecciona un tipo de comprobante")
    }),
    total_cost: z.coerce.number().positive("Seleccione al menos un servicio"),
    paid_amount: z.coerce
    .number({
        error: "Ingrese valor pagado"
    })
    .min(0, "Ingrese la cantidad pagada"),
    payment_method: z.object({
        name: z
        .string({
            error: "Selecciona al menos una forma de pago"
        })
        .min(1, "Selecciona al menos una forma de pago")
    }),
});