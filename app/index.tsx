import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { initDB, seedDB } from "@/database/migrations";
import { testDB } from "@/database/testDB";
import { EventsMainScreen } from "@/features/events/screens/EventsMainScreen";
import { StylesDefault } from "@/features/events/styles/StylesDefault";

export default function Index() {
  useEffect(() => {
    initDB();
    seedDB();
    //testDB();
    // defaultDB();

  }, []);

  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
    <SafeAreaView style={StylesDefault.container}>
      <EventsMainScreen /> 
    </SafeAreaView>
    </>
  );
}


