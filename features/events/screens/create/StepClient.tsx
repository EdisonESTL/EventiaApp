import React from "react";
import { View, StyleSheet, ScrollView} from "react-native";
import { HeadTitleDefault } from "../../components/HeadTitleDefault";
import { InputText, InputTextMultiline } from "../../components/InputText";
import { PropsStepClient } from "../../types/Events.types";

export function StepClient({ data, updateData }: PropsStepClient){
    const eventCustomer = data.event_customer ?? { name: "", phone: "", email: "" };

    return(
        <ScrollView style={styles.container}>
            <View style={styles.title}>
            <HeadTitleDefault color="#000000" 
            title="Cliente" 
            subtitle="Datos de la persona o empresa"/>
            </View>

            <View style={styles.input}>
            <InputText title="Nombre completo" 
            icono="user" 
            colorIcono="#000000"
            color="#000000"
            placeholder="Ejemplo Nombre"
            value={eventCustomer.name}
            onChangeText={(text) => updateData({
                event_customer: {
                    ...eventCustomer,
                    name: text
                }
            })}/>
            </View>
            <View style={styles.input}>
            <InputText title="Teléfono" 
            icono="phone" 
            colorIcono="#000000"
            color="#000000"
            placeholder="099999999"
            value={eventCustomer.phone}
            onChangeText={(text) => updateData({ event_customer: { ...eventCustomer, phone: text } })}/>
            </View>
            <View style={styles.input}>
            <InputText title="Correo electrónico" 
            icono="envelope" 
            colorIcono="#000000"
            color="#000000"
            placeholder="example@gmail.com"
            value={eventCustomer.email}
            onChangeText={(text) => updateData({ event_customer: { ...eventCustomer, email: text } })}/>
            </View>
            <View style={styles.inputMulti}>
            <InputTextMultiline title="Descripción del evento"
                icono="pencil"
                colorIcono="#000000"
                color="#000000"
                placeholder="Descripcion o notas del evento a tomar en cuenta.."
                value={data.description}
                onChangeText={(text) => updateData({ description: text })}
            />
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    title:{
        flex:1,
    },
    input:{
        flex:1,
    },
    inputMulti:{
        flex:3,
    },
})
