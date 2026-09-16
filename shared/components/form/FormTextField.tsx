import React from "react";
import { InputText } from "../InputText";
import { ModalField } from "@/shared/types/Shared.types";

type Props = {
    field: ModalField,
    value: string,
    onChange: (text: string) => void,
}

export function FormTextField ({ field, value, onChange } : Props) {
    return(
        <InputText 
            key={field.key}
            title={field.title}
            icono={field.icono}
            colorIcono={field.colorIcono}
            color={field.color}
            placeholder={field.placeholder}
            value={value}
            onChangeText={onChange}
            readonly={field.readonly ?? false}
        />
    )
}