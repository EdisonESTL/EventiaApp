import React from 'react';
import { PropsEventsTypes } from '../types/Admin.types';
import { View, Text, StyleSheet } from 'react-native';
import { CircleButton } from '@/shared/components/CircleButton';
import { Colors } from '@/shared/constants/colors';
import { StylesDefault } from '@/shared/styles/StylesDefault';

type PropsItemListDefault = {
    item: PropsEventsTypes;
    colorText: string;
};

export function ItemListDefault({ item, colorText }: PropsItemListDefault) {
    return (
        <View style={styles.itemContainer}>
            <View >
                <Text style={[ StylesDefault.h3Text, { color: colorText } ]}>{item.name}</Text>
                <Text style={StylesDefault.subText}>{item.deleted ? "Eliminado" : "Activo"}</Text>
            </View>
            <View style={styles.actionContainer}>
                        
                <CircleButton icono="pencil"
                onPress={() => {}}
                colorIcono="#ffffff"
                backgroundColor={Colors.secondary}
                readonly={false}/>
                        
                
                <CircleButton icono="trash"
                onPress={() => {}}
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