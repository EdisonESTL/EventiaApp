import React, {useState, useEffect} from "react";
import { View, StyleSheet } from "react-native";
import { PropsServices } from "@/features/admin/types/Admin.types";
import { getServices } from "@/features/admin/services/adminService";
import { ViewDefault } from "@/features/admin/components/ViewDefault";
import { Colors } from "@/shared/constants/colors";
import { router } from "expo-router";

export default function ServicesTypes(){

    const [data, setData] = useState<PropsServices[]>([]);

    const loadServices = async () => {
        try {
            const services = getServices();
            setData(services);
        } catch (error) {
            console.error("Error loading services:", error);
        }
    };

    useEffect(() => {
        loadServices();
    }, []);

    return(
        <View style={styles.container}>
            <ViewDefault
                data={data}

                titleHeader="Servicios"
                subtitleHeader="Gestiona los servicios que ofreces"
                colorText={Colors.yellow1}

                iconoButtonHeader="chevron-back"
                onPressButtonHeader={() => router.back()}
                colorsButtonHeader={Colors.yellow1}
                colorIconoButtonHeader= {Colors.white}
                
                titleActionButton="Crear servicio"
                iconoActionButton="add"
                onPressActionButton={() => console.log("Crear servicio pressed")}
                colorsButtonActionButton={Colors.gradients.quinary}
                colorActionButton={Colors.white}
                readonlyActionButton= {false}
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