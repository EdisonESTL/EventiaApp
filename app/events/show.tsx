import EventForm from "@/features/events/components/EventForm";
import { getEventById } from "@/features/events/services/eventService";
import { useLocalSearchParams } from "expo-router";
import React from "react";  
import { Event } from "@/features/events/types/Events.types";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export default function Show(){

   const { id } = useLocalSearchParams();

   const event = getEventById(Number(id));

   const handleUpdate = (event: Event) => {
      //updateEvent(updatedEvent);
      console.log("llegamos a actualizar")
   }

   return(
      <SafeAreaView style={styles.container}>

         <EventForm
            mode="view"
            titleText="Evento"
            initialData={event ?? {}}
            onSubmit={handleUpdate}
         />

      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
});