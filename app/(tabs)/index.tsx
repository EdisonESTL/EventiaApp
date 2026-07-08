import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { initDB, seedDB } from "@/database/migrations";
import { EventsMainScreen } from "@/features/events/screens/EventsMainScreen";
import { StylesDefault } from "@/shared/styles/StylesDefault";

export default function Index() {
  useEffect(() => {
    initDB();
    seedDB();

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


