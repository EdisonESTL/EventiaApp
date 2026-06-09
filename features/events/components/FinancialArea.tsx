import React from "react";
import {View, Text, StyleSheet, ScrollView } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StylesDefault } from "../styles/StylesDefault";
import { PropsFinancialArea, PropsFinancialBox} from "../types/Events.types";
import { HeadTitle } from "../components/HeadTitle";

export function FinancialArea({monthsIncome, outstandingPayments, monthsSales, showAmounts}: PropsFinancialArea) {
    
    return(
        <View style={StylesDefault.container}>
            <HeadTitle titleTex="Resumen Financiero" 
            iconoTitle="bar-chart" 
            titleTextAction="Este mes" 
            iconoAction="keyboard-arrow-down" 
            onPress={() => console.log("si se pudo")}/>
            <CardResume monthsIncome={monthsIncome} outstandingPayments={outstandingPayments} monthsSales={monthsSales} showAmounts={showAmounts} />
        </View>
    );
}

function CardResume({monthsIncome, outstandingPayments, monthsSales, showAmounts }: PropsFinancialArea){
    return(
        <ScrollView horizontal
            contentContainerStyle={styles.container}
            showsHorizontalScrollIndicator={false}>

            <FinancialBox backgroundColor="#47DDAA33" 
            icono="attach-money"
            title="Ingresos del mes"
            value={"$ " + monthsIncome?.toFixed(2) || "0.00"}
            showAmounts={showAmounts}
             />

            <FinancialBox backgroundColor="#EDED1133" 
            icono="credit-card"
            title="Por cobrar"
            value={"$ " + outstandingPayments?.toFixed(2) || "0.00"}
            showAmounts={showAmounts}
             />

            <FinancialBox backgroundColor="#7E258E33" 
            icono="calendar-month"
            title="Evento este mes"
            value={"$ " + monthsSales?.toFixed(2) || "0.00"}
            showAmounts={showAmounts}
             />
            
        </ScrollView>
    );
}

function FinancialBox({backgroundColor, icono, title, value, showAmounts}: PropsFinancialBox){
    return(
        <View style={[styles.financialBox, {backgroundColor}]}>
            <View style={styles.container1}>
                <MaterialIcons name={icono} size={24} color="black" />
                <Text style={StylesDefault.subText2}>{title}</Text>
            </View>
            
            <Text style={StylesDefault.h3Text}>
                {showAmounts ? value : "$ ****"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        gap: 5,
        alignItems: "center",
    },
    container1:{
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
    },
    financialBox:{
        height:90,
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        padding: 5,
        borderRadius: 10,
    },
});