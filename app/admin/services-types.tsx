import React, {useState, useEffect} from "react";
import { View, StyleSheet } from "react-native";
import { PropsServices, ServicesType } from "@/features/admin/types/Admin.types";
import { deleteServicesService, getServices, saveServicesService } from "@/features/admin/services/adminService";
import { ViewDefault } from "@/features/admin/components/ViewDefault";
import { Colors } from "@/shared/constants/colors";
import { router } from "expo-router";
import { ModalDefault } from "@/features/admin/components/ModalDefault";
import { ModalField } from "@/shared/types/Shared.types";

export default function ServicesTypes(){

    const [data, setData] = useState<PropsServices[]>([]);

    //Data del item para editar o eliminar
    const [selectedItem, setSelectedItem] = useState<Partial<ServicesType> | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    
    // Estado para controlar la visibilidad del modal
    const [showModal, setShowModal] = useState(false);

    const fields: ModalField[] = [
        {
            key: "name",
            type: "text",
            title: "Nombre del servicio",
            placeholder: "Dj",
            icono: "star",
            colorIcono: Colors.yellow1,
            color: Colors.yellow1,
            readonly: false,
            visible: true,
        },
        {
            key: "description",
            type: "text",
            title: "Descripción",
            placeholder: "Dj",
            icono: "sticky-note",
            colorIcono: Colors.yellow1,
            color: Colors.yellow1,
            readonly: false,
            visible: true,
        },
        {
            key: "price",
            type: "text",
            title: "Precio",
            placeholder: "$0.00",
            icono: "money",
            colorIcono: Colors.yellow1,
            color: Colors.yellow1,
            readonly: false,
            visible: true,
        },
        {
            key: "deleted",
            type: "switch",
            title: "Estado",
            placeholder: "Estado del servicioo",
            icono: "clone",
            colorIcono: Colors.yellow1,
            color: Colors.yellow1,
            readonly: false,
            visible: true,
        },
    ]

    const loadServices = async () => {
        try {
            const services = getServices();
            setData(services);
        } catch (error) {
            console.error("Error loading services:", error);
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
    };

    const saveServices = (service: Partial<ServicesType>) => {
        try {
            if(isValidService(service)){
                console.log("Guardando servicio:", service);
                saveServicesService(service);
                closeModal();
                loadServices(); // Recargar los servicios después de guardar
            } else {
                console.error("El nombre del servicio es inválido.");
            }
        } catch (error) {
            console.error("Error saving service:", error);
        }
    };

    const editServices = (service: Partial<ServicesType>) => {
        try {
            if(isValidService(service)){
                console.log("Editando servicio:", service);
                saveServicesService(service);
                closeModal();
                loadServices(); // Recargar los servicios después de guardar
            } else {
                console.error("El nombre del servicio es inválido.");
            }   
        } catch (error) {
            console.error("Error editing service:", error);
        }
    };

    const deleteServices = (service: Partial<ServicesType>) => {
        try {
            console.log("Eliminando servicio con ID:", service.id);
            if(isValidService(service)) {
                // Lógica para eliminar el servicio
                deleteServicesService(Number(service.id));
                loadServices(); // Recargar los servicios después de eliminar
                console.log("1. Servicio eliminado con éxito:", service.id);
            }
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    };

    //validar campos minimos para guardar
    const isValidService = (service:Partial<ServicesType>) => {
        
        return (
                !!service.name && service.name.trim() !== ""             
            );
    
    };

    //Botenes de accion para editar y elminiar los elemenmtos de la lista
    const onPressEdit = (item: ServicesType) => {
        setIsEditing(true);
        setSelectedItem(item);
        setShowModal(true);
    };

    const onPressDelete = (item: ServicesType) => {
        console.log("Eliminar tipo de servicio:", item);
        setSelectedItem(item);
        deleteServices(item);
    };

    useEffect(() => {
        loadServices();
    }, []);

    return(
        <View style={styles.container}>
            <ViewDefault
                data={data}
                titleList="Lista de serviciso que ofreces"

                titleHeader="Servicios"
                subtitleHeader="Gestiona los servicios que ofreces"
                colorText={Colors.yellow1}

                iconoButtonHeader="chevron-back"
                onPressButtonHeader={() => router.back()}
                colorsButtonHeader={Colors.yellow1}
                colorIconoButtonHeader= {Colors.white}
                
                titleActionButton="Crear servicio"
                iconoActionButton="add"
                onPressActionButton={openModal}
                colorsButtonActionButton={Colors.gradients.quinary}
                colorActionButton={Colors.white}
                readonlyActionButton= {false}

                onPressEdit={onPressEdit}
                onPressDelete={onPressDelete}
            />

            <ModalDefault
                isVisible={showModal}
                onRequestClose={closeModal}
                title="Crear servicio"
                subtitle="Ingresa los datos del nuevo servicio"
                readonly={false}
                fields={fields}
                onPress={isEditing ? editServices : saveServices}

                isEditing={isEditing}
                selectedItem={selectedItem}
                titleEdit="Editar servicio"
                subtitleEdit="Modifica los datos del servicio"
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