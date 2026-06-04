import React from "react";
import { View, Text, StyleSheet, FlatList, Image, Pressable } from "react-native";
import { StylesDefault } from "../styles/StylesDefault";
import {EventStaff, PropsStaffTable} from "../types/Events.types"
import { CircleButton } from "./CircleButton";
import { Colors } from "../constants/colors";

export function StaffTable({ 
    staff, 
    onEdit, 
    onDelete,
    readonly
 }: PropsStaffTable){

    return(
        <View style={styles.ContainerTable}>
            <FlatList
            data={staff}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            renderItem={({ item }) => 
            <TableItem 
            item={item} 
            onEdit={onEdit} 
            onDelete={onDelete} 
            readonly={readonly}/>}

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

function TableItem({
    item, 
    onEdit, 
    onDelete,
    readonly
}: 
{
    item: EventStaff, 
    onEdit: (staff: EventStaff) => void, 
    onDelete: (id: number) => void,
    readonly: boolean
}){
  return(
    <Pressable style={styles.itemContainer}>
        <View style={styles.itemImageContainer}>
            <Image
                source={require('../../../assets/images/user-staff.png')}
                style={styles.itemImage}
            />
        </View>

        <View style={styles.staff}>

            <Text style={StylesDefault.bodyTextBold}>{item.role}</Text>
            <Text style={StylesDefault.bodyText}>{item.staff.name}</Text>
            <Text style={StylesDefault.bodyText}>{item.staff.phone}</Text>
        
        </View>

        <View style={styles.actionContainer}>
            {!readonly &&
                <CircleButton icono="pencil"
                onPress={() => onEdit(item)}
                colorIcono="#ffffff"
                backgroundColor={Colors.secondary}
                readonly={readonly}/>
            }
            
            {!readonly && 
                <CircleButton icono="trash"
                onPress={() => onDelete(item.id!)}
                colorIcono="#ffffff"
                backgroundColor={Colors.delete}
                readonly={readonly}/>
            }

        </View>    
    </Pressable>
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