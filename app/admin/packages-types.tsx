import React, {useState, useEffect} from "react";
import { View, StyleSheet } from "react-native";
import { PropsPackages } from "@/features/admin/types/Admin.types";
import { getPackages } from "@/features/admin/services/adminService";
import { ViewDefault } from "@/features/admin/components/ViewDefault";
import { Colors } from "@/shared/constants/colors";
import { router } from "expo-router";
import { ModalDefault } from "@/features/admin/components/ModalDefault";
import { ModalField } from "@/shared/types/Shared.types";

export default function PackagesTypes(){

    const [data, setData] = useState<PropsPackages[]>([]);
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
            colorIcono: Colors.green1,
            color: Colors.green1,
            value: "activo",
            onChangeText: (text: string) => {},
            readonly: false,
            visible: true,
        },
    ]

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
        setShowModal(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        loadPackagesTypes();
    }, []);

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
            />

            <ModalDefault
                isVisible={showModal}
                onRequestClose={closeModal}
                title="Crear tipo de paquete"
                subtitle="Ingresa los datos del nuevo tipo de paquete"
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