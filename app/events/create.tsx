import { Stack, router } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Event } from "@/features/events/types/Events.types";
import { createEvent } from "@/features/events/services/eventService";
import EventForm from "@/features/events/components/EventForm";
import { clientSchema } from "@/features/events/schemas/client.schema";
import { eventSchema } from "@/features/events/schemas/event.schema";
import { serviceSchema } from "@/features/events/schemas/service.schema";
import { financialSchema } from "@/features/events/schemas/financial.schema";

export default function Create(){
    //Funcion para guardar el evento
    const saveEvent = (newEvent: Partial<Event>) => {
        try {

            if(isValidBaseEvent(newEvent)){
                createEvent(newEvent as Event);
                router.push("/");
            }else{
                alert("Llene la informacion basica para guardar el evento:\n -Cliente \n -Evento \n -Servicio (minimo 1) \n -Informacion de pago");
            }
        } catch(error){

            console.log("ERROR GUARDANDO:", error);
        }
    }

    //validar campos minimos para guardar
    const isValidBaseEvent = (event: Partial<Event>) => {

        return (
            clientSchema.safeParse(event).success &&
            eventSchema.safeParse(event).success &&
            serviceSchema.safeParse(event).success &&
            financialSchema.safeParse(event).success &&
            event.services && event.services.length > 0
        );
    }

    return(
        <>
        <Stack.Screen 
        options={{ headerShown: false }}
        />
        <SafeAreaView style={styles.container}>
            <EventForm 
            titleText="Crear evento"
            initialData={{
                services: [],
                equipment: [],
                schedule: [],
                staff: [],
            }} 
            mode="create" 
            onSubmit={saveEvent} />
        </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
});