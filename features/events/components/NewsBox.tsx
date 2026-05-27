import React from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { PropsNewsBox } from "../types/Events.types";
import { View, Text, StyleSheet } from "react-native";
import { StylesDefault } from "../styles/StylesDefault";

export function NewsBox({title, icono, backgroundColor, colorIcono}:PropsNewsBox){
    return(
        <View style={[styles.container, {backgroundColor}]}>
            <FontAwesome name={icono} size={32} color={colorIcono} />
            <Text adjustsFontSizeToFit
            numberOfLines={2} 
            style={[StylesDefault.subText, styles.textContainer]}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#ffffff",
        borderRadius: 10,
        flexDirection: "row",
        gap: 10,
        padding: 20,
    },
    textContainer:{
        flex: 1,
        textAlign: "left",
    }
});