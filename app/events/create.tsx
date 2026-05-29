import { Stack, router } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Event } from "@/features/events/types/Events.types";
import { createEvent } from "@/features/events/services/eventService";
import EventForm from "@/features/events/components/EventForm";

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
            !!event.event_customer &&
            !!event.description &&
            !!event.name &&
            !!event.event_type &&
            !!event.event_package &&
            !!event.location &&
            !!event.start_datetime &&
            !!event.end_datetime &&
            !!event.receipt_type &&
            !!event.payment_method &&
            !!event.paid_amount &&
            !!event.services &&
            event.services.length > 0
        );
    };
    
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