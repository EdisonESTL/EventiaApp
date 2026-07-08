import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Entypo, Ionicons } from '@expo/vector-icons';
import { StylesDefault } from "@/shared/styles/StylesDefault";
import { Colors } from "@/shared/constants/colors";
import { CircleButton } from "@/shared/components/CircleButton";

type Props = {
    title: string,
    subtitle: string,
    icono?: keyof typeof Entypo.glyphMap,
    iconoButton?: keyof typeof Ionicons.glyphMap,
    onPressButton?: () => void,
    colorsButton?: string,
    colorIconoButton?: string,  
}

// Componente compuesto por un icono, un titulo y un subtitulo, 
// opcionalmente puede tener un boton con un icono a la izquierda 
// del titulo y subtitulo.
export default function HeadDefault({
    title, 
    subtitle, 
    icono, 
    iconoButton, 
    onPressButton,
    colorsButton,
    colorIconoButton
}: Props){

    return (
        <View style={styles.head}>
            {iconoButton && (
                <CircleButton icono={iconoButton} onPress={onPressButton ?? (() => {})}
                colorIcono={colorIconoButton ?? "#000000"} 
                backgroundColor={colorsButton ?? "#E7BCEE"}/>
            )}

            <Entypo name={icono} size={35} color="black" />

            <View style={styles.textContainer}>
                <Text style={StylesDefault.h2Text}>
                    {title}
                </Text>

                <Text style={StylesDefault.subText}>
                    {subtitle}
                </Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  head:{
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    paddingLeft: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderColor: Colors.gray500,
  },
  textContainer: {
    flex: 1,
  },
  pressable: {
    padding: 5,
    borderRadius: 5,
  },
});