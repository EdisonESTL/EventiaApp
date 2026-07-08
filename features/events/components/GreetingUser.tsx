import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { StylesDefault } from "../../../shared/styles/StylesDefault";
import { ActionButton } from "@/shared/components/ActionButton";
import { Colors } from "@/shared/constants/colors";

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
        colorsButton={Colors.gradients.primary}
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