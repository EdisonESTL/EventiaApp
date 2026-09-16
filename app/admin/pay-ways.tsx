import React, {useState, useEffect} from "react";
import { View, StyleSheet } from "react-native";
import { PropsPaymentMethods } from "@/features/admin/types/Admin.types";
import { getPaymentMethods } from "@/features/admin/services/adminService";
import { ViewDefault } from "@/features/admin/components/ViewDefault";
import { Colors } from "@/shared/constants/colors";
import { router } from "expo-router";
import { ModalDefault } from "@/features/admin/components/ModalDefault";
import { ModalField } from "@/shared/types/Shared.types";

export default function PayWays(){

    const [data, setData] = useState<PropsPaymentMethods[]>([]);
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
            colorIcono: Colors.orange1,
            color: Colors.orange1,
            value: "activo",
            onChangeText: (text: string) => {},
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
        setShowModal(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setShowModal(false);
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
            />

            <ModalDefault
                isVisible={showModal}
                onRequestClose={closeModal}
                title="Crear forma de pago"
                subtitle="Ingresa los datos de la nueva forma de pago"
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