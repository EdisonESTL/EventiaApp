import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { StylesDefault } from "../styles/StylesDefault";
import {PropsEquipmentTable, EventEquipment} from "../types/Events.types"
import { CircleButton } from "./CircleButton";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export function EquipmentsTable({ equipments }: PropsEquipmentTable){
    return(
        <View style={styles.ContainerTable}>
            <FlatList
            data={equipments}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
            renderItem={({ item }) => <TableItem item={item} />}
            ListHeaderComponent={<Text style={StylesDefault.bodyTextBold}>Lista de equipos</Text>}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            ListEmptyComponent={
                <Text style={StylesDefault.subText}>
                    No hay equipos seleccionados
                </Text>
            }
            scrollEnabled={true}
            nestedScrollEnabled={true}
            />
        </View> 
    );
}

function TableItem({item}: {item: EventEquipment}){
  return(
    <View style={styles.itemContainer}>
        <View style={styles.itemIcoContainer}>
            <MaterialCommunityIcons name="audio-video" size={32} color="black" />
        </View>
        <View style={styles.equipment}>
            <Text style={StylesDefault.bodyTextBold}>{item.equipment.name}</Text>
            <Text style={StylesDefault.bodyText}>{item.quantity}</Text>
        </View>
        <View style={styles.actionContainer}>
            <CircleButton icono="trash"
             onPress={() => console.log("si se pudo")}
             colorIcono="#ffffff"
             backgroundColor="#9e1243"/>
        </View>    
    </View>
  );
}

const styles = StyleSheet.create({
    ContainerTable: {
        flex: 1,  
        paddingBottom: 10,
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
    itemIcoContainer:{
        flex: 0,
    },
    equipment:{
        flex: 1,
    },
    actionContainer:{
        flex: 0,
    },
});