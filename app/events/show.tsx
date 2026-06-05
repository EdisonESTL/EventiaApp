import EventForm from "@/features/events/components/EventForm";
import { deleteEvent, getEventById, updateEvent } from "@/features/events/services/eventService";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";  
import { Event } from "@/features/events/types/Events.types";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export default function Show(){

   const [mode, setMode] = useState<"view" | "edit">("view");
   
   const { id } = useLocalSearchParams();

   const event = getEventById(Number(id));

   const handleUpdate = (event: Event) => {
      updateEvent(event);
      setMode("edit");
      alert("Evento actualizado correctamente");
      setMode("view");
   }

   const handleDelete = (id: number) => {
      deleteEvent(id);
      alert("Evento eliminado correctamente");
      router.push("/");
   }

   const handleEdit = (id: number) => {

      setMode("edit");
      
   }
   return(
      <SafeAreaView style={styles.container}>

         <EventForm
            mode={mode}
            titleText={mode === "view" ? "Ver Evento" : "Editar Evento"}
            initialData={event ?? {}}
            onSubmit={handleUpdate}
            onDelete={() => handleDelete(Number(id))}
            onEdit={() => handleEdit(Number(id))}
         />

      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
});