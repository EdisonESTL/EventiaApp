import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function EventScreen() {
  return (
    <>
    <Stack.Screen 
      options={{ headerShown: false }}
    />
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
      </View>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});