import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import {PropDateTimePick} from "../../../features/events/types/Events.types"
import { StylesDefault } from "../../styles/StylesDefault";

export function DateTimePick({
    title, 
    icono, 
    mode, 
    value, 
    show, 
    readonly,
    setShow, 
    onChange}:PropDateTimePick){
    
        console.log("value en datetimepick", value)
    
    function timeStringToDate(value: string): Date {
        const [hours, minutes] = value.split(":").map(Number);

        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    }

    const dateValue = typeof value === "string" ?
        timeStringToDate(value) : value;
    
    
    const formattedValue = mode === "date"
        ? dateValue.toLocaleDateString()
        : dateValue.toLocaleTimeString([], {
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
                value={dateValue}
                mode={mode}
                onChange={(event, selectedDate) => {                    
                    onChange(event, selectedDate);
                    setShow(false);
                }}
                design="default"
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