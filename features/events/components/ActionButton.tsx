import React from "react";
import { PropsActionButton } from "../types/Events.types";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StylesDefault } from "../styles/StylesDefault";

export function ActionButton({ title, icono, onPress, colorsButton, color}: PropsActionButton) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
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
        //minWidth: 100,
        height: 60,
        borderRadius: 30,
        paddingHorizontal:30,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 5
    },
})