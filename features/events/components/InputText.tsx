import React from "react";
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from "react-native";
import { PropsInputText } from "../types/Events.types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StylesDefault } from "../styles/StylesDefault";

interface InputTextProps extends PropsInputText {
    value?: string;
    onChangeText?: (text: string) => void;
    keyboardType?: KeyboardTypeOptions;
}

export function InputText({title, icono, colorIcono, color, placeholder, value, onChangeText, keyboardType, readonly}:InputTextProps){
    return(
        <View style={styles.inputText}>
            <Text style={[StylesDefault.bodyText, {color}]}>{title}</Text>
            <View style={styles.inputBox}>
                <FontAwesome name={icono} size={24} color={colorIcono} />
                <TextInput 
                    style={styles.inText} 
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    editable={readonly ? false : true}
                />
            </View>
        </View>
    );
}

export function InputTextMultiline({title, icono, colorIcono, color, placeholder, value, onChangeText, readonly}:InputTextProps){
    return(
        <View style={styles.inputText}>
            <View style={styles.inputBox}>
                <FontAwesome name={icono} size={24} color={colorIcono} />
                <Text style={[StylesDefault.bodyText, {color}]}>{title}</Text>
            </View>
            <TextInput
                multiline
                placeholder={placeholder}
                style={styles.textArea}
                value={value}
                onChangeText={onChangeText}
                textAlignVertical="top"
                editable={readonly ? false : true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputText: {     
        padding: 10,
        gap: 10,
    },
    inputBox:{ 
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    inText: {
        flex: 1,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5, 
        paddingHorizontal: 10,
        paddingVertical: 8,   
    },
    textArea: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        minHeight: 140,

        paddingHorizontal: 15,
        paddingVertical: 15,

        fontSize: 16,
        color: "#222",

        backgroundColor: "#FFF",

        textAlignVertical: "top",
    },
});