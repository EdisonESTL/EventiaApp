import React, {useState, useEffect} from "react";
import { View, StyleSheet } from "react-native";
import { PropsPaymentMethods } from "@/features/admin/types/Admin.types";
import { getPaymentMethods } from "@/features/admin/services/adminService";
import { ViewDefault } from "@/features/admin/components/ViewDefault";
import { Colors } from "@/shared/constants/colors";
import { router } from "expo-router";

export default function PayWays(){

    const [data, setData] = useState<PropsPaymentMethods[]>([]);

    const loadPaymentMethods = async () => {
        try {
            const paymentMethods = getPaymentMethods();
            setData(paymentMethods);
        } catch (error) {
            console.error("Error loading payment methods:", error);
        }
    };

    useEffect(() => {
        loadPaymentMethods();
    }, []);

    return(
        <View style={styles.container}>
            <ViewDefault
                data={data}

                titleHeader="Formas de pago"
                subtitleHeader="Gestiona las formas de pago aceptadas"
                colorText={Colors.orange1}

                iconoButtonHeader="chevron-back"
                onPressButtonHeader={() => router.back()}
                colorsButtonHeader={Colors.orange1}
                colorIconoButtonHeader= {Colors.white}
                
                titleActionButton="Crear forma de pago"
                iconoActionButton="add"
                onPressActionButton={() => console.log("Crear forma de pago pressed")}
                colorsButtonActionButton={Colors.gradients.tertiary}
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