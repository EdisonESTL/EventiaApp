import React from "react";
import { PropsActionButton } from "@/shared/types/Shared.types";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StylesDefault } from "@/shared/styles/StylesDefault";

//Componente Boton degradado de 3 colores, bordes redondeados, 
//con un icono al lado izquierdo y un texto
export function ActionButton({ title, icono, onPress, colorsButton, color, readonly}: PropsActionButton) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}
      disabled={readonly}>
        <LinearGradient 
          colors={colorsButton} 
          style={styles.gradient} 
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}>
          <Text style={[StylesDefault.bodyText, styles.texButon, {color}]}>{title}</Text>
          <Ionicons name={icono} size={24} color={color} />
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    texButon: {
        color: "#fff",
        textAlign: "center",
    },
    gradient: {
        height: 60,
        borderRadius: 30,
        paddingHorizontal:30,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 5
    },
})