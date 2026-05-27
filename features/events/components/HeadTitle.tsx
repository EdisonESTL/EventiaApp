import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PropsHeadTitle, PropsTextAction, PropsTextTitle } from "../types/Events.types";
import { StylesDefault } from "../styles/StylesDefault";

//Componente compuesto de un grafico a la deracha con texto y un boton de accion al lado izquierdo
export function HeadTitle({titleTex, iconoTitle, titleTextAction, iconoAction, onPress}:PropsHeadTitle){
    return(
        <View style={styles.head}>
            <TextTitle title={titleTex} icono={iconoTitle} />
            <TextAction title={titleTextAction} icono={iconoAction} onPress={onPress} />
        </View>
    );
}

function TextTitle({title, icono}: PropsTextTitle){
    return(
        <View style={styles.textTitle}>
            <Ionicons name={icono} size={24} color="black" />
            <Text style={StylesDefault.h4Text}>{title}</Text>
        </View>
    );
}

function TextAction({title, icono, onPress}:PropsTextAction){
    return(
        <View style={styles.textAction}>
            <Text>{title}</Text>
            <MaterialIcons name={icono} size={24} color="black" />
        </View>
    );
}

const styles = StyleSheet.create({
    textTitle:{
        flexDirection: "row",
        gap: 3,
        alignItems:"center",
    },
    textAction:{
        flexDirection: "row",
        gap: 3,
        alignItems: "center",
    },
    head:{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
    },
});