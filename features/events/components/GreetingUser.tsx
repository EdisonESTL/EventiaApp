import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { StylesDefault } from "../styles/StylesDefault";
import { ActionButton } from "./ActionButton";

export function GreetingUser() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.element}>
        <NameUser />
      </View>

      <View style={styles.buttonContainer}>
        <ActionButton title="Crear evento" 
        icono="add" 
        onPress={() => router.push("/events/create")}
        colorsButton={['#522E9B',"#3968B5", '#20A1CF',]}
        color="#ffffff"/>
      </View>
    </View>
  );
}

function NameUser() {
  return (
    <View style={styles.containerName}>
      <Text numberOfLines={2} style={StylesDefault.h2Text}>Bienvenido, Tero</Text>
      <Text numberOfLines={2} 
      adjustsFontSizeToFit 
      style={StylesDefault.subText}>
        Administra tus eventos con facilidad
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 5,
  },
  element: {
    flex:1,
    justifyContent: "center",
    paddingRight: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    flexShrink: 1,
  },
  containerName: {
    flex: 1,
    justifyContent: "center",
  },
});