import { Colors } from "@/shared/constants/colors";
import React, {useEffect, useState} from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { getEventsTypes } from "@/features/admin/services/adminService";
import { PropsEventsTypes } from "@/features/admin/types/Admin.types";

import { ViewDefault } from "@/features/admin/components/ViewDefault";

export default function EventTypes(){
    
    const [data, setData] = useState<PropsEventsTypes[]>([]);

    const loadEventTypes = async () => {
        try {
            const eventTypes = getEventsTypes();
            setData(eventTypes);
        } catch (error) {
            console.error("Error loading event types:", error);
        }
    };

    useEffect(() => {
        loadEventTypes();
    }, []);

    return(        
        <View style={styles.container}>
            <ViewDefault
                data={data}

                titleHeader="Tipos de Eventos"
                subtitleHeader="Gestiona las categorías de eventos que puedes ofrecer"
                colorText={Colors.purple1}

                iconoButtonHeader="chevron-back"
                onPressButtonHeader={() => router.back()}
                colorsButtonHeader={Colors.purple1}
                colorIconoButtonHeader= {Colors.white}

                titleActionButton="Crear tipo de Evento"
                iconoActionButton="add"
                onPressActionButton={() => console.log("si se pudo")}
                colorsButtonActionButton={Colors.gradients.secondary}
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

