import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import HeadDefault from "@/features/admin/components/HeadDefault";
import { FilterableEventsTable } from "@/features/events/components/FiltereableEventsTable";

export default function EventScreen() {
  return (
    <>
    <Stack.Screen 
      options={{ headerShown: false }}
    />
    <SafeAreaView style={styles.container}>
      <View>
         <HeadDefault title="Eventos"
         subtitle="Lista de eventos"
         icono="calendar"/>
      </View>

      <View style={styles.body}>
        <FilterableEventsTable />
      </View>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body:{
    flex: 2,
    paddingTop: 10,
  }
});