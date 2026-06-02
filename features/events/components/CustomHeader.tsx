import React from "react";
import { Text, View, StyleSheet} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CircleButton } from "./CircleButton";
import { StylesDefault } from "../styles/StylesDefault";
import { PropsCustomHeader } from "../types/Events.types";

export function CustomHeader({ 
    icono1, 
    onBack, 
    icono2, 
    onSave,
    icono3,
    onDelete,
    icono4,
    onEdit, 
    title, 
    subtitle, 
    colors, 
    readonly
 }: PropsCustomHeader) {
    return (
        <LinearGradient
            colors={colors}
            start={{ x: -0.1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <CircleButton icono={icono1} onPress={onBack}
            colorIcono="#000000" backgroundColor="#47E7AF"/>
            <View style={styles.namePage}>
                <Text style={[StylesDefault.h2Text, styles.text]}>{title} </Text>
                <Text style={[StylesDefault.subText, styles.text]}>{subtitle}</Text>
            </View>
            { !readonly && (
                <CircleButton icono={icono2} onPress={onSave}
                colorIcono="#000000" backgroundColor="#E7BCEE"/>
            )}
            {readonly && (
                <CircleButton icono={icono4 ?? "pencil"} onPress={onEdit ?? (() => {})}
                colorIcono="#000000" backgroundColor="#E7BCEE"/>
            )}
            {readonly && (
                <CircleButton icono={icono3 ?? "trash"} onPress={onDelete ?? (() => {})}
                colorIcono="#000000" backgroundColor="#ea466c"/>
            )}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 90,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        gap: 5,
    },
    namePage: {
        flex: 1,
        marginLeft: 5,
    },
    text: {
        color: "#fff",
    },
});