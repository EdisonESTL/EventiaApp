import React, { useCallback, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { GreetingUser } from "../components/GreetingUser"
import { HeadAction } from "../components/HeadAction";
import { FinancialArea } from "../components/FinancialArea";
import { FilterableEventsTable } from "../components/FiltereableEventsTable";
import { StylesDefault } from "../styles/StylesDefault";
import { currentMonthSummary } from "../services/eventService";
import { useFocusEffect } from "expo-router";

export function EventsMainScreen() {

  const [monthsFinancial, setMonthFinancial] = useState<{month: string; totalIncome: number; totalOutstanding: number; totalSales: number} | null>();

  const [showAmounts, setShowAmounts] = useState(true);

  const toggleShowAmounts = () => {
    setShowAmounts(prev => !prev);
  }

  useEffect(() => {
    setMonthFinancial(currentMonthSummary());
  }, []);

  useFocusEffect(
      useCallback(() => {
        setMonthFinancial(currentMonthSummary());
      }, [])
    );

    return(
        <View style={StylesDefault.container}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardContainer}
          > 
              <View style={styles.head} >
                <HeadAction onPress={toggleShowAmounts}
                showAmounts={showAmounts} />
              </View>

              <View style={styles.GreetingUser} > 
                <GreetingUser />
              </View>

              <View style={styles.FinancialArea}>
                <FinancialArea 
                monthsIncome={monthsFinancial?.totalIncome} 
                outstandingPayments={monthsFinancial?.totalOutstanding} 
                monthsSales={monthsFinancial?.totalSales} 
                showAmounts={showAmounts} />
              </View>
            
            <View style={styles.FilterableEventsTable} >
                <FilterableEventsTable />
            </View>
          </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
  head: {
    flex: 0.8,
  },
  GreetingUser: {
    flex: 1,
  },
  FinancialArea:{
    flex:1,
  },
  FilterableEventsTable: {
    flex: 2,
  },
  keyboardContainer:{
        flex:2,
    },
});