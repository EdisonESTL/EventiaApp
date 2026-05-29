import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { PropsCircleButton } from "../types/Events.types";

export function CircleButton({icono, onPress, colorIcono, backgroundColor, readonly}:PropsCircleButton){
    return(
        <Pressable onPress={onPress} 
        style={[styles.buttonCircle, {backgroundColor}]}
        disabled={readonly}
        >

            <Ionicons name={icono} size={30} color={colorIcono} />

        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonCircle: {
        width: 55,
        height: 55,
        borderRadius: 60,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
    },
});