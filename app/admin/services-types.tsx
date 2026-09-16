import React, {useState, useEffect} from "react";
import { View, StyleSheet } from "react-native";
import { PropsServices } from "@/features/admin/types/Admin.types";
import { getServices } from "@/features/admin/services/adminService";
import { ViewDefault } from "@/features/admin/components/ViewDefault";
import { Colors } from "@/shared/constants/colors";
import { router } from "expo-router";
import { ModalDefault } from "@/features/admin/components/ModalDefault";
import { ModalField } from "@/shared/types/Shared.types";

export default function ServicesTypes(){

    const [data, setData] = useState<PropsServices[]>([]);
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
            value: "",
            onChangeText: (text: string) => {},
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
            value: "",
            onChangeText: (text: string) => {},
            readonly: false,
            visible: true,
        },
        {
            key: "cost",
            type: "text",
            title: "Costo",
            placeholder: "$0.00",
            icono: "money",
            colorIcono: Colors.yellow1,
            color: Colors.yellow1,
            value: "",
            onChangeText: (text: string) => {},
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
            value: "activo",
            onChangeText: (text: string) => {},
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
        setShowModal(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setShowModal(false);
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
            />

            <ModalDefault
                isVisible={showModal}
                onRequestClose={closeModal}
                title="Crear servicio"
                subtitle="Ingresa los datos del nuevo servicio"
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