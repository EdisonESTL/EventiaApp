import React, {useState, useEffect} from "react";
import { View, StyleSheet } from "react-native";
import { BaseType, PropsReceiptTypes } from "@/features/admin/types/Admin.types";
import { deleteReceiptTypesService, getReceiptTypes, saveReceiptTypeService } from "@/features/admin/services/adminService";
import { ViewDefault } from "@/features/admin/components/ViewDefault";
import { Colors } from "@/shared/constants/colors";
import { router } from "expo-router";
import { ModalField } from "@/shared/types/Shared.types";
import { ModalDefault } from "@/features/admin/components/ModalDefault";

export default function ReceiptsTypes(){

    const [data, setData] = useState<PropsReceiptTypes[]>([]);
    
    //Data del item para editar o eliminar
    const [selectedItem, setSelectedItem] = useState<Partial<BaseType> | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    
    // Estado para controlar la visibilidad del modal
    const [showModal, setShowModal] = useState(false);

    const fields: ModalField[] = [
        {
            key: "name",
            type: "text",
            title: "Nombre del comprobante",
            placeholder: "Nota de venta",
            icono: "file-text",
            colorIcono: Colors.blue1,
            color: Colors.blue1,
            readonly: false,
            visible: true,
        },
        {
            key: "deleted",
            type: "switch",
            title: "Estado",
            placeholder: "Estado del tipo de evento",
            icono: "clone",
            colorIcono: Colors.blue1,
            color: Colors.blue1,
            readonly: false,
            visible: true,
        },
    ]

    const loadReceiptTypes = async () => {
        try {
            const receiptTypes = getReceiptTypes();
            setData(receiptTypes);
        } catch (error) {
            console.error("Error loading receipt types:", error);
        }
    };

    // Función para abrir el modal
    const openModal = () => {
        setIsEditing(false);
        setSelectedItem(null);
        setShowModal(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setSelectedItem(null);
        setIsEditing(false);
        setShowModal(false);
    };

    const saveReceiptTypes = (receiptType: Partial<BaseType>) => {
        try {
            if(isValidReceiptType(receiptType)){
                console.log("Guardando tipo de comprobante:", receiptType);
                saveReceiptTypeService(receiptType);
                closeModal();
                loadReceiptTypes(); // Recargar los tipos de comprobantes después de guardar
            } else {
                console.error("El nombre del tipo de comprobante es inválido.");
            }
        } catch (error) {
            console.error("Error saving receipt type:", error);
        }
    };

    const editReceiptTypes = (receiptType: Partial<BaseType>) => {
        try {
            if(isValidReceiptType(receiptType)){
                console.log("Editando tipo de comprobante:", receiptType);
                saveReceiptTypeService(receiptType);
                closeModal();
                loadReceiptTypes(); // Recargar los tipos de comprobantes después de guardar
            } else {
                console.error("El nombre del tipo de comprobante es inválido.");
            }   
        } catch (error) {
            console.error("Error editing receipt type:", error);
        }
    };

    const deleteReceiptTypes = (receiptType: Partial<BaseType>) => {
        try {
            console.log("Eliminando tipo de comprobante con ID:", receiptType.id);
            if(isValidReceiptType(receiptType)) {
                // Lógica para eliminar el tipo de comprobante
                deleteReceiptTypesService(Number(receiptType.id));
                loadReceiptTypes(); // Recargar los tipos de comprobantes después de eliminar
                console.log("1. Tipo de comprobante eliminado con éxito:", receiptType.id);
            }
        } catch (error) {
            console.error("Error deleting receipt type:", error);
        }
    };

    //validar campos minimos para guardar
    const isValidReceiptType = (receiptType:Partial<BaseType>) => {
        
        return (
                !!receiptType.name && receiptType.name.trim() !== ""             
            );
    
    };

    //Botenes de accion para editar y elminiar los elemenmtos de la lista
    const onPressEdit = (item: BaseType) => {
        setIsEditing(true);
        setSelectedItem(item);
        setShowModal(true);
    };

    const onPressDelete = (item: BaseType) => {
        console.log("Eliminar tipo de paquete:", item);
        setSelectedItem(item);
        deleteReceiptTypes(item);
    };

    useEffect(() => {
        loadReceiptTypes();
    }, []);

    return(
        <View style={styles.container}>
            <ViewDefault
                data={data}
                titleList="Lista de comprobantes que puedes entregar"

                titleHeader="Tipos de Comprobantes"
                subtitleHeader="Gestiona los tipos de comprobantes fiscales disponibles"
                colorText={Colors.blue1}

                iconoButtonHeader="chevron-back"
                onPressButtonHeader={() => router.back()}
                colorsButtonHeader={Colors.blue1}
                colorIconoButtonHeader= {Colors.white}
                
                titleActionButton="Crear tipo de comprobante"
                iconoActionButton="add"
                onPressActionButton={openModal}
                colorsButtonActionButton={Colors.gradients.primary}
                colorActionButton={Colors.white}
                readonlyActionButton= {false}

                onPressEdit={onPressEdit}
                onPressDelete={onPressDelete}
            />

            <ModalDefault
                isVisible={showModal}
                onRequestClose={closeModal}
                title="Crear comprobante"
                subtitle="Ingresa los datos del nuevo comprobante"
                readonly={false}
                fields={fields}
                onPress={isEditing ? editReceiptTypes : saveReceiptTypes}

                isEditing={isEditing}
                selectedItem={selectedItem}
                titleEdit="Editar tipo de comprobante"
                subtitleEdit="Modifica los datos del tipo de comprobante"
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