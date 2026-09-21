import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircleButton } from '@/shared/components/CircleButton';
import { Colors } from '@/shared/constants/colors';
import { StylesDefault } from '@/shared/styles/StylesDefault';

type ListItemBase = {
    name?: string;
    deleted?: boolean;
};

type PropsItemListDefault<T extends ListItemBase> = {
    item: T;
    colorText: string;
    onPressEdit?: (item: T) => void;
    onPressDelete?: (item: T) => void;
};

export function ItemListDefault<T extends ListItemBase>({ 
    item, 
    colorText, 
    onPressEdit, 
    onPressDelete 
}: PropsItemListDefault<T>) {
    return (
        <View style={styles.itemContainer}>
            <View >
                <Text style={[ StylesDefault.h3Text, { color: colorText } ]}>{item.name}</Text>
                <Text style={StylesDefault.subText}>{item.deleted ? "Desactivado" : "Activado"}</Text>
            </View>
            <View style={styles.actionContainer}>
                        
                <CircleButton icono="pencil"
                onPress={() => onPressEdit && onPressEdit(item)}
                colorIcono="#ffffff"
                backgroundColor={Colors.secondary}
                readonly={false}/>
                        
                
                <CircleButton icono="trash"
                onPress={() => onPressDelete && onPressDelete(item)}
                colorIcono="#ffffff"
                backgroundColor={Colors.delete}
                readonly={false}/>
                        
            
             </View> 
        </View>
    );
}

const styles = StyleSheet.create({
    
    itemContainer:{
        flex:1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

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
    actionContainer:{
        flexDirection: "row",
        gap: 10,
    },
});