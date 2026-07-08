import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { PropsHeadTitleDefault } from "../types/Events.types";
import { StylesDefault } from "../../../shared/styles/StylesDefault";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

//Componente usado como titulo principal de formulario, por defecto usa una imagen
export function HeadTitleDefault({color, title, subtitle, icono}:PropsHeadTitleDefault){
    return(
        <View style={styles.CardHeader}>
            {
                icono ? 
                <MaterialCommunityIcons name={icono} size={30} color="black" style={styles.icoTitle}  /> :
                <Image style={styles.icoEventData} source={require("../../../assets/images/eventia.png")}/>
            }
            <View>
                <Text style={[StylesDefault.h3Text, {color}]} >{title}</Text>
                <Text style={[StylesDefault.subText, {color}]} >{subtitle}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    CardHeader: {
        flex:1,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },
    icoEventData: {
        height: 50,
        width: 50,
        resizeMode: "contain",
    },
    icoTitle:{
        padding:10,
    }
});
