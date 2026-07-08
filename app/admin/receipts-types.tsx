import React, {useState, useEffect} from "react";
import { View, StyleSheet } from "react-native";
import { PropsReceiptTypes } from "@/features/admin/types/Admin.types";
import { getReceiptTypes } from "@/features/admin/services/adminService";
import { ViewDefault } from "@/features/admin/components/ViewDefault";
import { Colors } from "@/shared/constants/colors";
import { router } from "expo-router";

export default function ReceiptsTypes(){

    const [data, setData] = useState<PropsReceiptTypes[]>([]);

    const loadReceiptTypes = async () => {
        try {
            const receiptTypes = getReceiptTypes();
            setData(receiptTypes);
        } catch (error) {
            console.error("Error loading receipt types:", error);
        }
    };

    useEffect(() => {
        loadReceiptTypes();
    }, []);

    return(
        <View style={styles.container}>
            <ViewDefault
                data={data}

                titleHeader="Tipos de Comprobantes"
                subtitleHeader="Gestiona los tipos de comprobantes fiscales disponibles"
                colorText={Colors.blue1}

                iconoButtonHeader="chevron-back"
                onPressButtonHeader={() => router.back()}
                colorsButtonHeader={Colors.blue1}
                colorIconoButtonHeader= {Colors.white}
                
                titleActionButton="Crear tipo de comprobante"
                iconoActionButton="add"
                onPressActionButton={() => console.log("Crear tipo de comprobante pressed")}
                colorsButtonActionButton={Colors.gradients.primary}
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