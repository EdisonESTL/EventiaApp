import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { StylesDefault } from "@/features/events/styles/StylesDefault";
import { Colors } from "@/features/events/constants/colors";

type Props = {
    title: string,
    subtitle: string,
    icono?: keyof typeof Entypo.glyphMap;
}

export default function HeadDefault({title, subtitle, icono}: Props){
    return (
        <View style={styles.head}>
            <Entypo name={icono} size={35} color="black" />

            <View>
                <Text style={StylesDefault.h2Text}>
                    {title}
                </Text>

                <Text style={StylesDefault.subText}>
                    {subtitle}
                </Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  head:{
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    paddingLeft: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderColor: Colors.gray500,
  },
});