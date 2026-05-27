import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { StylesDefault } from "../styles/StylesDefault";
import {EventStaff, PropsStaffTable} from "../types/Events.types"
import { CircleButton } from "./CircleButton";

export function StaffTable({ staff }: PropsStaffTable){
    return(
        <View style={styles.ContainerTable}>
            <FlatList
            data={staff}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
            renderItem={({ item }) => <TableItem item={item} />}
            ListHeaderComponent={<Text style={StylesDefault.bodyTextBold}>Lista de staff</Text>}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            ListEmptyComponent={
                <Text style={StylesDefault.subText}>
                    No hay staff seleccionado
                </Text>
            }
            scrollEnabled={true}
            nestedScrollEnabled={true}
            />
        </View> 
    );
}

function TableItem({item}: {item: EventStaff}){
  return(
    <View style={styles.itemContainer}>
        <View style={styles.itemImageContainer}>
            <Image
                source={require('../../../assets/images/user-staff.png')}
                style={styles.itemImage}
            />
        </View>
        <View style={styles.staff}>
            <Text style={StylesDefault.bodyTextBold}>{item.staff.role}</Text>
            <Text style={StylesDefault.bodyText}>{item.staff.name}</Text>
            <Text style={StylesDefault.bodyText}>{item.staff.phone}</Text>
        </View>
        <View style={styles.actionContainer}>
            <CircleButton icono="call"
             onPress={() => console.log("si se pudo")}
             colorIcono="#ffffff"
             backgroundColor="#6750A4"/>
            <CircleButton icono="logo-whatsapp"
             onPress={() => console.log("si se pudo")}
             colorIcono="#ffffff"
             backgroundColor="#25D366"/>
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
        padding: 5,
        gap: 10,
        backgroundColor:"#ffffff",
        borderRadius: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
    },
    itemImageContainer:{
        flex: 0,
        alignItems: "center",
    },
    staff:{
        flex: 1,
    },
    actionContainer:{
        flex: 0,
        flexDirection: "row",
        gap: 10,
    },
    itemImage:{
        width: 50,
        height: 50,
        borderRadius: 25,
    },
});