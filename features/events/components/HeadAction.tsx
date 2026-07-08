import React from "react";
import { Text, Image, StyleSheet, View, Pressable } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { StylesDefault } from "../../../shared/styles/StylesDefault";
import { PropsHeadAction } from "../types/Events.types";
import { scheduleNotification } from "../services/notificationService";

function TitleApp() {
  return (
    <View style={styles.element1}>
      <LogoApp />
      <NameApp />
    </View>
  );
}

function LogoApp() {
  return (
    <View style={styles.logo}>
      <Pressable onPress={() => scheduleNotification({title: "Don't forget!", body: "Check your events today!"})}>
         <Image style={styles.imageLogo} source={require("../../../assets/images/eventia.png")}/>
      </Pressable>
    </View>
  );
}

function NameApp() {
  return (
    <View style={styles.nameApp}>
      <Text style={StylesDefault.nameApp}>Eventia</Text>
    </View>
  );
}

function NotificationArea(
  { 
    onPress, 
    showAmounts 
  }: 
  { 
  onPress: () => void; 
  showAmounts: boolean 
  }
) {
  return(
    <View style={styles.element2}>

      <MaterialIcons name="notifications" size={30} color="black" />

      <Pressable onPress={onPress}>
        <Entypo name={ showAmounts ? "eye" : "eye-with-line"} 
        size={30} 
        color="black" />
      </Pressable>

    </View>
  );
}

export function HeadAction({ onPress, showAmounts }: PropsHeadAction) {
  return (
    <View style={styles.container}>
      <TitleApp />
      <NotificationArea onPress={onPress}
      showAmounts={showAmounts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  imageLogo: {
    width: 130,
    resizeMode: "contain",
  },
  logo:{
    alignItems: "flex-end",
  },
  nameApp: {
    alignItems: "center",
    justifyContent: "center",
  },
  element1: {
    flex: 4,
    flexDirection: "row",
  },
  element2: {
    flex: 1,
    gap: 30,
    alignItems: "center",
  }
});