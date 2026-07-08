import React, {useState, useEffect} from "react";
import { View, StyleSheet } from "react-native";
import { PropsPackages } from "@/features/admin/types/Admin.types";
import { getPackages } from "@/features/admin/services/adminService";
import { ViewDefault } from "@/features/admin/components/ViewDefault";
import { Colors } from "@/shared/constants/colors";
import { router } from "expo-router";

export default function PackagesTypes(){

    const [data, setData] = useState<PropsPackages[]>([]);

    const loadPackagesTypes = async () => {
        try {
            const packagesTypes = getPackages();
            setData(packagesTypes);
        } catch (error) {
            console.error("Error loading packages types:", error);
        }
    };

    useEffect(() => {
        loadPackagesTypes();
    }, []);

    return(
        <View style={styles.container}>
            <ViewDefault
                data={data}

                titleHeader="Tipos de Paquetes"
                subtitleHeader="Gestiona los tipos de paquetes que puedes ofrecer"
                colorText={Colors.green1}

                iconoButtonHeader="chevron-back"
                onPressButtonHeader={() => router.back()}
                colorsButtonHeader={Colors.green1}
                colorIconoButtonHeader= {Colors.white}
                
                titleActionButton="Crear tipo de Paquete"
                iconoActionButton="add"
                onPressActionButton={() => console.log("Crear tipo de Paquete pressed")}
                colorsButtonActionButton={Colors.gradients.cuaternary}
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