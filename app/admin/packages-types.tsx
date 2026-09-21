import React, {useState, useEffect} from "react";
import { View, StyleSheet } from "react-native";
import { BaseType, PropsPackages } from "@/features/admin/types/Admin.types";
import { deletePackagesTypes, getPackages, savePackagesTypes } from "@/features/admin/services/adminService";
import { ViewDefault } from "@/features/admin/components/ViewDefault";
import { Colors } from "@/shared/constants/colors";
import { router } from "expo-router";
import { ModalDefault } from "@/features/admin/components/ModalDefault";
import { ModalField } from "@/shared/types/Shared.types";

export default function PackagesTypes(){

    const [data, setData] = useState<PropsPackages[]>([]);

    //Data del item para editar o eliminar
    const [selectedItem, setSelectedItem] = useState<Partial<BaseType> | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Estado para controlar la visibilidad del modal
    const [showModal, setShowModal] = useState(false);

    const fields: ModalField[] = [
        {
            key: "name",
            type: "text",
            title: "Nombre del paquete",
            placeholder: "Paquete Premium",
            icono: "gift",
            colorIcono: Colors.green1,
            color: Colors.green1,
            readonly: false,
            visible: true,
        },
        {
            key: "deleted",
            type: "switch",
            title: "Estado",
            placeholder: "Estado del tipo de evento",
            icono: "clone",
            colorIcono: Colors.green1,
            color: Colors.green1,
            readonly: false,
            visible: true,
        },
    ]

    //Funcion para cargar los tipos de paquetes desde el servicio
    const loadPackagesTypes = async () => {
        try {
            const packagesTypes = getPackages();
            setData(packagesTypes);
        } catch (error) {
            console.error("Error loading packages types:", error);
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

    const savePackageType = (packageType: Partial<BaseType>) => {
        try {
            if(isValidPackageType(packageType)){
                console.log("Guardando tipo de paquete:", packageType);
                savePackagesTypes(packageType);
                closeModal();
                loadPackagesTypes(); // Recargar los tipos de paquetes después de guardar
            } else {
                console.error("El nombre del tipo de paquete es inválido.");
            }
        } catch (error) {
            console.error("Error saving package type:", error);
        }
    };

    const editPackageType = (packageType: Partial<BaseType>) => {
        try {
            if(isValidPackageType(packageType)){
                console.log("Editando tipo de paquete:", packageType);
                
                savePackagesTypes(packageType);
                closeModal();
                loadPackagesTypes(); // Recargar los tipos de paquetes después de editar
            }} catch (error) {
            console.error("Error editing package type:", error);
        }
    }

    const deletePackageType = (packageType: Partial<BaseType>) => {
        try {
            if(isValidPackageType(packageType)){
                console.log("Eliminando tipo de paquete:", packageType);
                deletePackagesTypes(Number(packageType.id!));
                loadPackagesTypes(); // Recargar los tipos de paquetes después de eliminar
            }
        } catch (error) {
            console.error("Error deleting package type:", error);
        }
    }       

    //validar campos minimos para guardar
    const isValidPackageType = (packageType:Partial<BaseType>) => {
        
        return (
                !!packageType.name && packageType.name.trim() !== ""             
            );
    
    };

    useEffect(() => {
        loadPackagesTypes();
    }, []);

    //Botenes de accion para editar y elminiar los elemenmtos de la lista
    const onPressEdit = (item: BaseType) => {
        setIsEditing(true);
        setSelectedItem(item);
        setShowModal(true);
    };

    const onPressDelete = (item: BaseType) => {
        console.log("Eliminar tipo de paquete:", item);
        setSelectedItem(item);
        deletePackageType(item);
    };
    
    return(
        <View style={styles.container}>
            <ViewDefault
                data={data}
                titleList="Lista de paquetes que ofreces:"

                titleHeader="Tipos de Paquetes"
                subtitleHeader="Gestiona los tipos de paquetes que puedes ofrecer"
                colorText={Colors.green1}

                iconoButtonHeader="chevron-back"
                onPressButtonHeader={() => router.back()}
                colorsButtonHeader={Colors.green1}
                colorIconoButtonHeader= {Colors.white}
                
                titleActionButton="Crear tipo de Paquete"
                iconoActionButton="add"
                onPressActionButton={openModal}
                colorsButtonActionButton={Colors.gradients.cuaternary}
                colorActionButton={Colors.white}
                readonlyActionButton= {false}

                onPressEdit={onPressEdit}
                onPressDelete={onPressDelete}
            />

            <ModalDefault
                isVisible={showModal}
                onRequestClose={closeModal}
                title="Crear tipo de paquete"
                subtitle="Ingresa los datos del nuevo tipo de paquete"
                readonly={false}
                fields={fields}
                onPress={isEditing ? editPackageType : savePackageType}

                isEditing={isEditing}
                selectedItem={selectedItem}
                titleEdit="Editar tipo de paquete"
                subtitleEdit="Modifica los datos del tipo de paquete"
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