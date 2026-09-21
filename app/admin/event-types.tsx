import { Colors } from "@/shared/constants/colors";
import { ModalField } from "@/shared/types/Shared.types";
import React, {useEffect, useState} from "react";
import { View, StyleSheet } from "react-native";
import { getEventsTypes, saveEventTypes, deleteEventTypes } from "@/features/admin/services/adminService";
import { EventType, PropsEventsTypes } from "@/features/admin/types/Admin.types";
import { ViewDefault } from "@/features/admin/components/ViewDefault";
import { ModalDefault } from "@/features/admin/components/ModalDefault";
import { router } from "expo-router";

export default function EventTypes(){
    
    // Data de los tipos de eventos 
    const [data, setData] = useState<PropsEventsTypes[]>([]);

    //Data del item para editar o eliminar
    const [selectedItem, setSelectedItem] = useState<Partial<EventType> | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Estado para controlar la visibilidad del modal
    const [showModal, setShowModal] = useState(false);
    const fields: ModalField[] = [
        {
            key: "name",
            type: "text",
            title: "Nombre del tipo de eventos",
            placeholder: "'Conferencia', 'Taller', 'Corporativo', etc.",
            icono: "clone",
            colorIcono: Colors.purple1,
            color: Colors.purple1,
            readonly: false,
            visible: true,
        },
        {
            key: "deleted",
            type: "switch",
            title: "Estado",
            placeholder: "Estado del tipo de evento",
            icono: "clone",
            colorIcono: Colors.purple1,
            color: Colors.purple1,
            readonly: false,
            visible: true,
        },
    ]

    // Función para cargar los tipos de eventos desde el servicio
    const loadEventTypes = async () => {
        try {
            const eventTypes = getEventsTypes();
            setData(eventTypes);
        } catch (error) {
            console.error("Error loading event types:", error);
        }
    };

    // Función para abrir el modal
    const openModal = () => {
        setIsEditing(false);
        setShowModal(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setSelectedItem(null);
        setIsEditing(false);
        setShowModal(false);
        //loadEventTypes();
    };

    const saveEventType = (eventType: Partial<EventType>) => {
        try {
            if(isValidEvenType(eventType)){
                saveEventTypes(eventType)

                loadEventTypes();
                closeModal();
            }else{
                alert("No hay un nombre ingresado")
            }
        } catch(error){
            console.log("ERROR GUARDANDO TIPO DE EVENTO", error);
        };
    }

    const editEventType = (eventType: Partial<EventType>) => {
        try {
            if(isValidEvenType(eventType)){
                saveEventTypes(eventType)
                closeModal();
                loadEventTypes();
            }
        } catch(error){
            console.log("ERROR EDITANDO TIPO DE EVENTO", error);
        };
    }

    const deleteEventType = (eventType: Partial<EventType>) => {
        try {
            console.log("llego")
            if(isValidEvenType(eventType)){
                console.log("se elimina", eventType)
                deleteEventTypes(eventType.id!)
                loadEventTypes();
            }
        } catch(error){
            console.log("ERROR ELIMINANDO TIPO DE EVENTO", error);
        };
    }

    //validar campos minimos para guardar
    const isValidEvenType = (eventType:Partial<EventType>) => {
    
        return (
            !!eventType.name               
        );

    };

    //Botenes de accion para editar y elminiar los elemenmtos de la lista
    const onPressEdit = (item: EventType) => {
        setIsEditing(true);
        setSelectedItem(item);
        setShowModal(true);
    };

    const onPressDelete = (item: EventType) => {
        console.log("Eliminar tipo de evento:", item);
        setSelectedItem(item);
        deleteEventType(item);
    };

    // Cargar los tipos de eventos al montar el componente
    useEffect(() => {
        loadEventTypes();
    }, []);


    return(        
        <View style={styles.container}>
            <ViewDefault
                data={data}
                titleList="Tipos de eventos que ofreces"

                titleHeader="Tipos de Eventos"
                subtitleHeader="Gestiona los tipos de eventos que puedes ofrecer"
                colorText={Colors.purple1}

                iconoButtonHeader="chevron-back"
                onPressButtonHeader={() => router.back()}
                colorsButtonHeader={Colors.purple1}
                colorIconoButtonHeader= {Colors.white}

                titleActionButton="Crear tipo de Evento"
                iconoActionButton="add"
                onPressActionButton={() => openModal()}
                colorsButtonActionButton={Colors.gradients.secondary}
                colorActionButton={Colors.white}
                readonlyActionButton= {false}

                onPressEdit={onPressEdit}
                onPressDelete={onPressDelete}
            />

            <ModalDefault
                isVisible={showModal}
                onRequestClose={closeModal}
                title="Crear tipo de evento"
                subtitle="Ingresa los datos del nuevo tipo de evento"
                readonly={false}
                fields={fields}
                onPress={isEditing ? editEventType : saveEventType}

                isEditing={isEditing}
                selectedItem={selectedItem}
                titleEdit="Editar tipo de evento"
                subtitleEdit="Modifica los datos del tipo de evento"
            />
        </View>
    )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 20,
  },
})

