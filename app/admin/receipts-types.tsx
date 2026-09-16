import React, {useState, useEffect} from "react";
import { View, StyleSheet } from "react-native";
import { PropsReceiptTypes } from "@/features/admin/types/Admin.types";
import { getReceiptTypes } from "@/features/admin/services/adminService";
import { ViewDefault } from "@/features/admin/components/ViewDefault";
import { Colors } from "@/shared/constants/colors";
import { router } from "expo-router";
import { ModalField } from "@/shared/types/Shared.types";
import { ModalDefault } from "@/features/admin/components/ModalDefault";

export default function ReceiptsTypes(){

    const [data, setData] = useState<PropsReceiptTypes[]>([]);
    
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
            value: "",
            onChangeText: (text: string) => {},
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
            value: "activo",
            onChangeText: (text: string) => {},
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
        setShowModal(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setShowModal(false);
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
            />

            <ModalDefault
                isVisible={showModal}
                onRequestClose={closeModal}
                title="Crear comprobante"
                subtitle="Ingresa los datos del nuevo comprobante"
                readonly={false}
                fields={fields}
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