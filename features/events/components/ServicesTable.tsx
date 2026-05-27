import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { StylesDefault } from "../styles/StylesDefault";
import {EventService, PropsServicesTable} from "../types/Events.types"

export function ServicesTable({ services}: PropsServicesTable){
    return(
        <View style={styles.ContainerTable}>
            <FlatList
            data={services}
            keyExtractor={(item) => item.service.id.toString()}
            renderItem={({ item }) => <TableItem item={item} />}
            ListHeaderComponent={<Text style={StylesDefault.bodyTextBold}>Lista de servicios</Text>}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            ListEmptyComponent={
                <Text style={StylesDefault.subText}>
                    No hay servicios seleccionados
                </Text>
            }
            scrollEnabled={true}
            nestedScrollEnabled={true}
            />
        </View> 
    );
}

function TableItem({item}: {item: EventService}){
  return(
    <View style={styles.itemContainer}>
        <View style={styles.itemResume}>
            <Text style={StylesDefault.bodyTextBold}>{item.service.name}</Text>
            <Text style={StylesDefault.bodyText}>{item.service.description}</Text>
        </View>
        <View style={styles.itemValue}>
            <Text style={StylesDefault.bodyTextBold}>{item.service.price}</Text>
        </View>    
    </View>
  );
}

const styles = StyleSheet.create({
    ContainerTable: {
        flex: 1,  
    },
    itemContainer:{
        flex:1,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        gap: 10,
        backgroundColor:"#ffffff",
        borderRadius: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
    },
    itemResume:{
        flex: 1,
    },
    itemValue:{
        flex: 0,
    },
});