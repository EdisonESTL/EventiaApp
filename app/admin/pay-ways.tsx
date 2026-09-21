import React, {useState, useEffect} from "react";
import { View, StyleSheet } from "react-native";
import { BaseType, PropsPaymentMethods } from "@/features/admin/types/Admin.types";
import { deletePayWays, getPaymentMethods, savePayWays } from "@/features/admin/services/adminService";
import { ViewDefault } from "@/features/admin/components/ViewDefault";
import { Colors } from "@/shared/constants/colors";
import { router } from "expo-router";
import { ModalDefault } from "@/features/admin/components/ModalDefault";
import { ModalField } from "@/shared/types/Shared.types";

export default function PayWays(){

    const [data, setData] = useState<PropsPaymentMethods[]>([]);

    //Data del item para editar o eliminar
    const [selectedItem, setSelectedItem] = useState<Partial<BaseType> | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Estado para controlar la visibilidad del modal
    const [showModal, setShowModal] = useState(false);

    const fields: ModalField[] = [
        {
            key: "name",
            type: "text",
            title: "Nombre de la forma de pago",
            placeholder: "Trueque",
            icono: "credit-card",
            colorIcono: Colors.orange1,
            color: Colors.orange1,
            readonly: false,
            visible: true,
        },
        {
            key: "deleted",
            type: "switch",
            title: "Estado",
            placeholder: "Estado de la forma de pago",
            icono: "clone",
            colorIcono: Colors.orange1,
            color: Colors.orange1,
            readonly: false,
            visible: true,
        },
    ]

    const loadPaymentMethods = async () => {
        try {
            const paymentMethods = getPaymentMethods();
            setData(paymentMethods);
        } catch (error) {
            console.error("Error loading payment methods:", error);
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

    const savePaysWays = (paymentMethod: Partial<BaseType>) => {
        try {
            if(isValidPayWay(paymentMethod)){
                console.log("Guardando forma de pago:", paymentMethod);
                savePayWays(paymentMethod);
                closeModal();
                loadPaymentMethods(); // Recargar los tipos de paquetes después de guardar
            } else {
                console.error("El nombre de la forma de pago es inválido.");
            }
        } catch (error) {
            console.error("Error saving payment method:", error);
        }
    };

    const editPaysWays = (paymentMethod: Partial<BaseType>) => {
        try {
            if(isValidPayWay(paymentMethod)){
                console.log("Editando forma de pago:", paymentMethod);
                savePayWays(paymentMethod);
                closeModal();
                loadPaymentMethods(); // Recargar los tipos de paquetes después de guardar
            } else {
                console.error("El nombre de la forma de pago es inválido.");
            }   
        } catch (error) {
            console.error("Error editing payment method:", error);
        }
    };

    const deletePaysWays = (paymentMethod: Partial<BaseType>) => {
        try {
            console.log("Eliminando forma de pago con ID:", paymentMethod.id);
            if(isValidPayWay(paymentMethod)) {
                // Lógica para eliminar la forma de pago
                deletePayWays(Number(paymentMethod.id));
                loadPaymentMethods(); // Recargar las formas de pago después de eliminar
                console.log("1. Forma de pago eliminada con éxito:", paymentMethod.id);
            }
        } catch (error) {
            console.error("Error deleting payment method:", error);
        }
    };

    //validar campos minimos para guardar
    const isValidPayWay = (paymentMethod:Partial<BaseType>) => {
        
        return (
                !!paymentMethod.name && paymentMethod.name.trim() !== ""             
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
        deletePaysWays(item);
    };

    useEffect(() => {
        loadPaymentMethods();
    }, []);

    return(
        <View style={styles.container}>
            <ViewDefault
                data={data}
                titleList="Lista formas de pago que aceptas"

                titleHeader="Formas de pago"
                subtitleHeader="Gestiona las formas de pago aceptadas"
                colorText={Colors.orange1}

                iconoButtonHeader="chevron-back"
                onPressButtonHeader={() => router.back()}
                colorsButtonHeader={Colors.orange1}
                colorIconoButtonHeader= {Colors.white}
                
                titleActionButton="Crear forma de pago"
                iconoActionButton="add"
                onPressActionButton={openModal}
                colorsButtonActionButton={Colors.gradients.tertiary}
                colorActionButton={Colors.white}
                readonlyActionButton= {false}

                onPressEdit={onPressEdit}
                onPressDelete={onPressDelete}
            />

            <ModalDefault
                isVisible={showModal}
                onRequestClose={closeModal}
                title="Crear forma de pago"
                subtitle="Ingresa los datos de la nueva forma de pago"
                readonly={false}
                fields={fields}
                onPress={isEditing ? editPaysWays : savePaysWays}

                isEditing={isEditing}
                selectedItem={selectedItem}
                titleEdit="Editar forma de pago"
                subtitleEdit="Modifica los datos de la forma de pago"
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