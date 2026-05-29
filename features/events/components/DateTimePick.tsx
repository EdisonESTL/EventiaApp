import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import {PropDateTimePick} from "../types/Events.types"
import { StylesDefault } from "../styles/StylesDefault";

export function DateTimePick({title, icono, mode, value, show, readonly,setShow, onChange}:PropDateTimePick){
    const formattedValue = mode === "date"
            ? value.toLocaleDateString()
            : value.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
    });
        
    return(
        <View style={styles.container}>
            <Text style={StylesDefault.bodyText}>{title}</Text>
            <View style={styles.inputTextDefault}>
                <MaterialCommunityIcons name={icono} size={30} color="black" />
                <Pressable
                    style={styles.InputDate}                            
                    onPress={() => setShow(true)}
                    disabled={readonly}
                >
                    <Text>
                        {formattedValue}
                    </Text>
                </Pressable>
            </View>
            {show && (
                <DateTimePicker
                value={value}
                mode={mode}
                onChange={onChange}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        gap: 10,
        alignContent: "center"
    },
    inputTextDefault:{
        flex: 1,
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    },
    InputDate: {
        flex: 1,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
    },
      
})