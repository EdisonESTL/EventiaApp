import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { GreetingUser } from "../components/GreetingUser"
import { HeadAction } from "../components/HeadAction";
import { FinancialArea } from "../components/FinancialArea";
import { FilterableEventsTable } from "../components/FiltereableEventsTable";
import { StylesDefault } from "../styles/StylesDefault";

export function EventsMainScreen() {
    return(
        <View style={StylesDefault.container}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardContainer}
          > 
              <View style={styles.head} >
                <HeadAction/>
              </View>

              <View style={styles.GreetingUser} > 
                <GreetingUser />
              </View>

              <View style={styles.FinancialArea}>
                <FinancialArea />
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