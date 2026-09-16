import { Colors } from "@/shared/constants/colors";
import { ModalField } from "@/shared/types/Shared.types";
import React, {useEffect, useState} from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { getEventsTypes, saveEventTypes } from "@/features/admin/services/adminService";
import { EventType, PropsEventsTypes } from "@/features/admin/types/Admin.types";
import { ViewDefault } from "@/features/admin/components/ViewDefault";
import { ModalDefault } from "@/features/admin/components/ModalDefault";

export default function EventTypes(){
    
    // Data de los tipos de eventos 
    const [data, setData] = useState<PropsEventsTypes[]>([]);
    // Estado para controlar la visibilidad del modal
    const [showModal, setShowModal] = useState(false);
    const fields: ModalField[] = [
        {
            key: "name",
            type: "text",
            title: "Nombre de la categoría de evento",
            placeholder: "Categoria",
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
        setShowModal(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setShowModal(false);
    };

    const saveEventType = (eventType: Partial<EventType>) => {
        try {
            console.log("llego")
            if(isValidEvenType(eventType)){
                console.log("se guarda", eventType)
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

    //validar campos minimos para guardar
    const isValidEvenType = (eventType:Partial<EventType>) => {
    
        return (
            !!eventType.name               
        );

    };

    // Cargar los tipos de eventos al montar el componente
    useEffect(() => {
        loadEventTypes();
    }, []);


    return(        
        <View style={styles.container}>
            <ViewDefault
                data={data}
                titleList="Categorias de eventos que ofreces"

                titleHeader="Tipos de Eventos"
                subtitleHeader="Gestiona las categorías de eventos que puedes ofrecer"
                colorText={Colors.purple1}

                iconoButtonHeader="chevron-back"
                onPressButtonHeader={() => router.back()}
                colorsButtonHeader={Colors.purple1}
                colorIconoButtonHeader= {Colors.white}

                titleActionButton="Crear tipo de Evento"
                iconoActionButton="add"
                onPressActionButton={openModal}
                colorsButtonActionButton={Colors.gradients.secondary}
                colorActionButton={Colors.white}
                readonlyActionButton= {false}

            />

            <ModalDefault
                isVisible={showModal}
                onRequestClose={closeModal}
                title="Crear categoría de evento"
                subtitle="Ingresa los datos de la nueva categoría de evento"
                readonly={false}
                fields={fields}
                onPress={saveEventType}
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

